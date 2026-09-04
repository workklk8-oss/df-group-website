import Link from "next/link";
import Reveal, { RevealItem } from "@/components/Reveal";
import { localePath, ui, type Lang } from "@/lib/i18n";

export type Person = {
  mono?: string;
  name: string;
  role?: string;
  bio?: string;
  tag?: string;
  photo?: string;
};

type TeamContent = { leadership: Person[]; analysts: Person[] };
type SiteContent = typeof import("@/content/site.json");

/** Square portrait: shows the uploaded photo, or falls back to initials. */
function Portrait({ person }: { person: Person }) {
  if (person.photo) {
    return (
      <div className="person__ph">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={person.photo} alt={person.name} />
      </div>
    );
  }
  return (
    <div className="person__ph" aria-hidden="true">
      {person.mono}
    </div>
  );
}

export default function TeamPage({
  lang,
  team,
  site,
}: {
  lang: Lang;
  team: TeamContent;
  site: SiteContent;
}) {
  const t = site.teamPage;
  const s = ui[lang];

  return (
    <>
      <section className="pagehead">
        <div className="pagehead__wash" aria-hidden="true" />
        <div className="pagehead__inner">
          <p className="eyebrow eyebrow--onink">{t.eyebrow}</p>
          <h1 className="display">{t.heading}</h1>
          <p className="lede">{t.lede}</p>
          <div className="pagehead__rule" />
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap">
          <Reveal className="sec-head">
            <div>
              <p className="eyebrow eyebrow--dim">{t.leadershipEyebrow}</p>
              <h2 className="h2" style={{ marginTop: 14 }}>
                {t.leadershipHeading}
              </h2>
            </div>
          </Reveal>
          <Reveal className="people" stagger>
            {team.leadership.map((p) => (
              <RevealItem className="person" as="article" key={p.name}>
                <Portrait person={p} />
                <div className="person__name">{p.name}</div>
                <div className="person__role">{p.role}</div>
                <p className="person__bio">{p.bio}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--card">
        <div className="wrap">
          <Reveal className="sec-head">
            <div>
              <p className="eyebrow eyebrow--dim">{t.analystsEyebrow}</p>
              <h2 className="h2" style={{ marginTop: 14 }}>
                {t.analystsHeading}
              </h2>
            </div>
            <div className="sec-head__aside">
              <p className="lede">{t.analystsLede}</p>
            </div>
          </Reveal>
          <Reveal className="people" stagger>
            {team.analysts.map((p) => (
              <RevealItem className="person" as="article" key={p.name}>
                <Portrait person={p} />
                <div className="person__name">{p.name}</div>
                <div className="person__role">{s.analyst}</div>
                <span className="person__tag">{p.tag}</span>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--ink">
        <Reveal className="wrap two-col">
          <div>
            <p className="eyebrow eyebrow--onink">{t.ctaEyebrow}</p>
            <h2
              className="h2"
              style={{ marginTop: 16, color: "var(--ivory)", maxWidth: "16ch" }}
            >
              {t.ctaHeading}
            </h2>
          </div>
          <div className="prose" style={{ alignSelf: "center" }}>
            <p>{t.ctaText}</p>
            <Link
              className="txtlink"
              href={localePath(lang, "/contact")}
              style={{ marginTop: 8 }}
            >
              {t.ctaLabel} <span>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
