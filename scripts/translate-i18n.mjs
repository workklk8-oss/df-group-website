/**
 * Automatically translates the English content into Simplified Chinese.
 *
 * Runs after sync-i18n.mjs on every build. It uses DeepL, and needs an API key
 * in the environment variable DEEPL_API_KEY. **If the key is missing or DeepL
 * fails, the build carries on unchanged** — translation never breaks the site.
 *
 * What it translates
 *   - any Chinese field that is still holding English text
 *   - any field whose English source has changed since it was last translated
 *
 * What it leaves alone
 *   - Chinese someone has edited by hand, as long as the English has not
 *     changed since (so a human correction survives)
 *   - anything listed in content/cn/.no-translate.json (see below)
 *   - names, initials, links, images, numbers, email addresses
 *
 * Locking a phrase
 *   Wording that has been legally or commercially reviewed should not be
 *   silently replaced when someone tweaks the English. Add its path to
 *   content/cn/.no-translate.json, e.g.
 *     ["home.json .practices.items[0].desc", "site.json .footerBlurb"]
 *   The paths are exactly the ones printed by the build.
 *
 * A record of what was translated from what is kept in
 * content/cn/.translation-cache.json so that unchanged text is not sent to
 * DeepL again (it is both slower and counts against the quota).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const EN = "content";
const CN = join("content", "cn");
const CACHE = join(CN, ".translation-cache.json");
const LOCKS = join(CN, ".no-translate.json");

const FILES = [
  "home.json",
  "site.json",
  "contact.json",
  "team.json",
  "news.json",
  "gallery.json",
];

/** Keys whose values are identifiers, not prose. */
const SKIP_KEYS = new Set([
  "image",
  "photo",
  "href",
  "link",
  "buttonLink",
  "mono",
  "name",
  "no",
]);

const DRY = process.argv.includes("--dry-run");

const key = process.env.DEEPL_API_KEY?.trim();
if (!key && !DRY) {
  console.log(
    "[translate] DEEPL_API_KEY not set — skipping auto-translation.\n" +
      "            Chinese pages keep whatever text they already have."
  );
  process.exit(0);
}

const endpoint = key?.endsWith(":fx")
  ? "https://api-free.deepl.com/v2/translate"
  : "https://api.deepl.com/v2/translate";

const readJson = (p, fallback) =>
  existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback;

const cache = readJson(CACHE, {});
const locks = new Set(readJson(LOCKS, []));

/** Brand names DeepL should not reinterpret. */
const KEEP = ["DF Group", "Diligent Faith", "LinkedIn", "INSEAD", "CFA", "TEDxHongKong"];

/** Values that should never be sent for translation. */
function isTranslatable(value) {
  if (typeof value !== "string") return false;
  const v = value.trim();
  if (!v) return false;
  if (/^https?:\/\//.test(v)) return false; // links
  if (/^\//.test(v)) return false; // paths
  if (/^[^\s@]+@[^\s@]+$/.test(v)) return false; // emails
  if (/^[\d\s+%.,\-–—]+$/.test(v)) return false; // pure numbers, e.g. "100+"
  if (/^[A-Z]{1,3}$/.test(v)) return false; // initials
  if (/^[\w-]+(\.[\w-]+)+$/.test(v)) return false; // bare domains, e.g. diligentfaith.com
  // Values made up only of brand names and separators, e.g. "DF Group . Diligent Faith"
  const stripped = KEEP.reduce((acc, t) => acc.split(t).join(""), v);
  if (!/[a-zA-Z一-鿿]/.test(stripped)) return false;
  return true;
}

/** Walk an object, calling back for each translatable leaf. */
function walk(obj, path, fn) {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walk(v, `${path}[${i}]`, fn));
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      if (SKIP_KEYS.has(k)) continue;
      walk(v, `${path}.${k}`, fn);
    }
  } else if (isTranslatable(obj)) {
    fn(obj, path);
  }
}

/** Set a value at a path like ".practices.items[0].desc" */
function setAt(root, path, value) {
  const parts = path.match(/[^.[\]]+/g) ?? [];
  let node = root;
  for (let i = 0; i < parts.length - 1; i++) {
    node = node[/^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i]];
  }
  const last = parts[parts.length - 1];
  node[/^\d+$/.test(last) ? Number(last) : last] = value;
}

function getAt(root, path) {
  const parts = path.match(/[^.[\]]+/g) ?? [];
  let node = root;
  for (const p of parts) {
    if (node == null) return undefined;
    node = node[/^\d+$/.test(p) ? Number(p) : p];
  }
  return node;
}

async function deepl(texts) {
  const out = [];
  for (let i = 0; i < texts.length; i += 45) {
    const batch = texts.slice(i, i + 45);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: batch,
        source_lang: "EN",
        target_lang: "ZH",
        preserve_formatting: true,
      }),
    });
    if (!res.ok) {
      throw new Error(`DeepL responded ${res.status}: ${await res.text()}`);
    }
    const data = await res.json();
    out.push(...data.translations.map((t) => t.text));
  }
  return out;
}

// ---------------------------------------------------------------- collect
const jobs = []; // { file, path, english }
const docs = {};

for (const file of FILES) {
  const en = readJson(join(EN, file), null);
  const cn = readJson(join(CN, file), null);
  if (!en || !cn) continue;
  docs[file] = cn;

  walk(en, "", (english, path) => {
    const id = `${file} ${path}`;
    if (locks.has(id)) return;

    const current = getAt(cn, path);
    const remembered = cache[id];

    // Untouched since we last translated it, and the English has not moved on.
    if (remembered && remembered.en === english && current === remembered.zh) {
      return;
    }
    // Someone edited the Chinese by hand and the English has not changed —
    // keep their wording.
    if (remembered && remembered.en === english && current !== remembered.zh) {
      return;
    }
    // Chinese already differs from the English and we have no record of it:
    // treat it as a human translation and remember it rather than replacing.
    if (!remembered && current && current !== english) {
      cache[id] = { en: english, zh: current };
      return;
    }
    jobs.push({ file, path, english, id });
  });
}

if (jobs.length === 0) {
  writeFileSync(CACHE, JSON.stringify(cache, null, 2) + "\n", "utf8");
  console.log("[translate] Chinese is up to date with English — nothing to do.");
  process.exit(0);
}

if (DRY) {
  console.log(`[translate] Dry run — ${jobs.length} field(s) would be translated:`);
  jobs.slice(0, 25).forEach((j, i) => {
    console.log(`  ${String(i + 1).padStart(2)}. ${j.id}`);
    console.log(`      ${j.english.slice(0, 78)}`);
  });
  if (jobs.length > 25) console.log(`  ...and ${jobs.length - 25} more`);
  console.log("  Nothing was sent to DeepL and no files were changed.");
  process.exit(0);
}

console.log(`[translate] Translating ${jobs.length} field(s) via DeepL…`);

try {
  const results = await deepl(jobs.map((j) => j.english));

  jobs.forEach((job, i) => {
    let zh = results[i];
    // Restore brand names DeepL may have transliterated.
    for (const term of KEEP) {
      if (job.english.includes(term) && !zh.includes(term)) {
        zh = zh.replace(new RegExp(term.replace(/\s/g, "\\s*"), "gi"), term);
      }
    }
    setAt(docs[job.file], job.path, zh);
    cache[job.id] = { en: job.english, zh };
  });

  for (const file of Object.keys(docs)) {
    writeFileSync(
      join(CN, file),
      JSON.stringify(docs[file], null, 2) + "\n",
      "utf8"
    );
  }
  writeFileSync(CACHE, JSON.stringify(cache, null, 2) + "\n", "utf8");

  console.log(`[translate] Done — ${jobs.length} field(s) updated.`);
  const byFile = jobs.reduce((m, j) => ((m[j.file] = (m[j.file] ?? 0) + 1), m), {});
  for (const [f, n] of Object.entries(byFile)) console.log(`            ${f}: ${n}`);
  console.log(
    "            Machine translation — please have a Chinese speaker review it.\n" +
      "            To protect reviewed wording, add its path to content/cn/.no-translate.json"
  );
} catch (err) {
  console.warn(
    `[translate] Skipped: ${err.message}\n` +
      "            The site still builds with the existing Chinese text."
  );
}
