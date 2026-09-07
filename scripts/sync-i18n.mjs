/**
 * Keeps the Chinese content files structurally in step with the English ones.
 *
 * English is the source of truth for STRUCTURE: which team members exist, which
 * photos, which news items, which practices, and in what order. Chinese is the
 * source of truth for its own WORDS — any translation already written is never
 * overwritten.
 *
 * So:
 *   - an item added in English appears in Chinese (with the English text as a
 *     placeholder, so nothing is missing from the page)
 *   - an item removed in English disappears from Chinese
 *   - order and non-text fields (images, links, dates, initials) always match
 *   - existing Chinese wording is preserved untouched
 *
 * Runs automatically before every build. Run it by hand with: npm run sync
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EN = "content";
const CN = join("content", "cn");

const read = (dir, f) =>
  JSON.parse(readFileSync(join(dir, f), "utf8"));
const write = (dir, f, data) =>
  writeFileSync(join(dir, f), JSON.stringify(data, null, 2) + "\n", "utf8");

/** Fields that must always be identical in both languages. */
const SHARED = ["image", "photo", "href", "mono", "name", "no"];

const notes = [];

/**
 * Align a Chinese list with the English one.
 * `key` picks the stable identity of an item (a name, an image path...).
 */
function syncList(enList, cnList, key, label) {
  // Keys can repeat (several news items share one LinkedIn link), so bucket by
  // key and consume them in order rather than keeping only the last.
  const buckets = new Map();
  for (const item of cnList) {
    const k = key(item);
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(item);
  }
  let added = 0;
  const result = enList.map((enItem) => {
    const bucket = buckets.get(key(enItem));
    const match = bucket && bucket.length ? bucket.shift() : undefined;
    // Start from the English item so new/renamed fields come across, then lay
    // any existing Chinese wording back on top.
    const merged = { ...enItem };
    if (match) {
      for (const [k, v] of Object.entries(match)) {
        if (!SHARED.includes(k) && v !== "" && v != null) merged[k] = v;
      }
    } else {
      added++;
    }
    // Shared fields always follow English.
    for (const f of SHARED) {
      if (f in enItem) merged[f] = enItem[f];
    }
    return merged;
  });
  const removed = cnList.length - (result.length - added);
  if (added || removed > 0) {
    notes.push(
      `${label}: ${added} added, ${Math.max(removed, 0)} removed (now ${result.length})`
    );
  }
  return result;
}

// ---------------------------------------------------------------- team
{
  const en = read(EN, "team.json");
  const cn = read(CN, "team.json");
  const byName = (p) => p.name;
  cn.leadership = syncList(en.leadership, cn.leadership, byName, "team/leadership");
  cn.analysts = syncList(en.analysts, cn.analysts, byName, "team/analysts");
  write(CN, "team.json", cn);
}

// ------------------------------------------------------------- gallery
{
  const en = read(EN, "gallery.json");
  const cn = read(CN, "gallery.json");
  cn.photos = syncList(en.photos, cn.photos, (p) => p.image, "gallery");
  write(CN, "gallery.json", cn);
}

// ------------------------------------------------------------ partners
// Logos are images and proper nouns; they are simply mirrored.
{
  const en = read(EN, "partners.json");
  write(CN, "partners.json", en);
}

// ---------------------------------------------------------------- news
{
  const en = read(EN, "news.json");
  const cn = read(CN, "news.json");
  cn.entries = syncList(
    en.entries,
    cn.entries,
    (e) => e.href,
    "news"
  );
  write(CN, "news.json", cn);
}

// ------------------------------------------------------- home practices
{
  const en = read(EN, "home.json");
  const cn = read(CN, "home.json");
  cn.practices.items = syncList(
    en.practices.items,
    cn.practices.items,
    (i) => i.no,
    "home/practices"
  );
  // The three hero figures are positional and always three.
  cn.stats = en.stats.map((s, i) => ({
    value: s.value,
    label: cn.stats?.[i]?.label ?? s.label,
  }));
  write(CN, "home.json", cn);
}

// ------------------------------------------------------- contact topics
{
  const en = read(EN, "contact.json");
  const cn = read(CN, "contact.json");
  cn.topics = en.topics.map((t, i) => ({
    label: cn.topics?.[i]?.label ?? t.label,
  }));
  write(CN, "contact.json", cn);
}

// --------------------------------------------------------------- report
// Flag any Chinese field still holding English text, so it is obvious what a
// translator still needs to look at.
const untranslated = [];
const looksEnglish = (s) =>
  typeof s === "string" &&
  s.trim().length > 12 &&
  !/[一-鿿]/.test(s) &&
  /[a-zA-Z]{4,}/.test(s);

function scan(obj, path, file) {
  if (typeof obj === "string") {
    if (looksEnglish(obj) && !/^https?:|^\/|@/.test(obj)) {
      untranslated.push(`${file} ${path}`);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((v, i) => scan(v, `${path}[${i}]`, file));
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      if (["image", "photo", "href", "link", "buttonLink", "mono", "name", "no", "value"].includes(k)) continue;
      scan(v, `${path}.${k}`, file);
    }
  }
}

for (const f of ["home.json", "team.json", "news.json", "gallery.json", "contact.json", "site.json"]) {
  scan(read(CN, f), "", f);
}

if (notes.length) {
  console.log("\n[i18n] Chinese structure updated to match English:");
  notes.forEach((n) => console.log("       " + n));
}
if (untranslated.length) {
  console.log(
    `\n[i18n] ${untranslated.length} Chinese field(s) still contain English and need translating:`
  );
  untranslated.slice(0, 20).forEach((u) => console.log("       " + u));
  if (untranslated.length > 20) {
    console.log(`       ...and ${untranslated.length - 20} more`);
  }
  console.log("       (the site still builds — these simply show English for now)\n");
}
if (!notes.length && !untranslated.length) {
  console.log("[i18n] English and Chinese are in step.\n");
}
