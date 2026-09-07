/**
 * Reports differences between the English and Chinese content.
 *
 * This script only ever READS. It never edits your files, so what you see in
 * the editor is always exactly what is on the website.
 *
 * The English and Chinese versions are maintained by hand: if you add or remove
 * a team member, photo or news item, do it in BOTH. This check runs on every
 * build and prints anything that looks out of step, so a forgotten edit shows
 * up instead of quietly going live.
 *
 * It never fails the build — an English-only change is sometimes deliberate.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const EN = "content";
const CN = join("content", "cn");

const read = (dir, f) => {
  const p = join(dir, f);
  return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : null;
};

const problems = [];

/** Compare two lists by a stable identity that is the same in both languages. */
function compare(label, enList = [], cnList = [], id) {
  const en = enList.map(id);
  const cn = cnList.map(id);
  const missing = en.filter((k) => !cn.includes(k));
  const extra = cn.filter((k) => !en.includes(k));
  if (missing.length) {
    problems.push(`${label}: missing from Chinese -> ${missing.join(", ")}`);
  }
  if (extra.length) {
    problems.push(`${label}: only in Chinese (remove it?) -> ${extra.join(", ")}`);
  }
}

const team = { en: read(EN, "team.json"), cn: read(CN, "team.json") };
if (team.en && team.cn) {
  compare("Team / leadership", team.en.leadership, team.cn.leadership, (p) => p.name);
  compare("Team / analysts", team.en.analysts, team.cn.analysts, (p) => p.name);
}

const gallery = { en: read(EN, "gallery.json"), cn: read(CN, "gallery.json") };
if (gallery.en && gallery.cn) {
  compare("Gallery", gallery.en.photos, gallery.cn.photos, (p) => p.image);
}

const news = { en: read(EN, "news.json"), cn: read(CN, "news.json") };
if (news.en && news.cn && news.en.entries.length !== news.cn.entries.length) {
  problems.push(
    `News: ${news.en.entries.length} entries in English but ${news.cn.entries.length} in Chinese`
  );
}

const home = { en: read(EN, "home.json"), cn: read(CN, "home.json") };
if (home.en && home.cn) {
  compare(
    "Home / practices",
    home.en.practices.items,
    home.cn.practices.items,
    (i) => i.no
  );
  if (home.en.stats.length !== home.cn.stats.length) {
    problems.push("Home / figures: the two versions have different numbers of figures");
  }
}

const contact = { en: read(EN, "contact.json"), cn: read(CN, "contact.json") };
if (contact.en && contact.cn) {
  if (contact.en.topics.length !== contact.cn.topics.length) {
    problems.push(
      `Contact / enquiry types: ${contact.en.topics.length} in English but ${contact.cn.topics.length} in Chinese`
    );
  }
}

if (problems.length) {
  console.log("\n[i18n] The English and Chinese versions differ:\n");
  problems.forEach((p) => console.log("       " + p));
  console.log(
    "\n       Both versions are edited by hand, so make the same change in the\n" +
      "       other language unless the difference is intentional.\n" +
      "       (Building anyway — this is only a reminder.)\n"
  );
} else {
  console.log("[i18n] English and Chinese are in step.");
}
