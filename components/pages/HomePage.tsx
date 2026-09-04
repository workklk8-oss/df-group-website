import Link from "next/link";
import Hero from "@/components/Hero";
import PracticeIndex from "@/components/PracticeIndex";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import TrustedBy from "@/components/TrustedBy";
import { withEmphasis } from "@/lib/emphasis";
import { localePath, type Lang } from "@/lib/i18n";

type HomeContent = typeof import("@/content/home.json");
type Partners = typeof import("@/content/partners.json");

export default function HomePage({
  lang,
  home,
  partners,
}: {
  lang: Lang;
  home: HomeContent;
  partners: Partners;
}) {
  const { intro, practices, approach, cta } = home;

  return (
    <>
      <Hero lang={lang} hero={home.hero} stats={home.stats} />

      <TrustedBy eyebrow={home.trustedByEyebrow} logos={partners.logos} />

      <section className="section section--paper">
        <Reveal className="wrap two-col">
          <div>
            <p className="eyebrow eyebrow--dim">{intro.eyebrow}</p>
            <p className="statement" style={{ marginTop: 20 }}>
              {withEmphasis(intro.statement)}
            </p>
          </div>
          <div className="prose">
            {intro.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section section--ink" id="practice">
        <div className="wrap">
          <Reveal className="sec-head">
            <div>
              <p className="eyebrow eyebrow--onink">{practices.eyebrow}</p>
              <h2 className="h2" style={{ marginTop: 16 }}>
                {practices.heading}
              </h2>
            </div>
            <div className="sec-head__aside">
              <p className="lede lede--onink">{practices.lede}</p>
            </div>
          </Reveal>
          <PracticeIndex items={practices.items} />
        </div>
      </section>

      <section className="section section--card">
        <Reveal className="wrap two-col">
          <div>
            <p className="eyebrow eyebrow--dim">{approach.eyebrow}</p>
            <p className="statement" style={{ marginTop: 20 }}>
              {withEmphasis(approach.statement)}
            </p>
          </div>
          <div className="prose">
            {approach.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <Link
              className="txtlink txtlink--dark"
              href={localePath(lang, "/team")}
              style={{ marginTop: 8 }}
            >
              {approach.linkLabel} <span>→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="section section--ink">
        <Reveal className="wrap two-col">
          <div>
            <p className="eyebrow eyebrow--onink">{cta.eyebrow}</p>
            <h2
              className="h2"
              style={{ marginTop: 16, color: "var(--ivory)", maxWidth: "16ch" }}
            >
              {cta.heading}
            </h2>
          </div>
          <div className="prose" style={{ alignSelf: "center" }}>
            <p>{cta.text}</p>
            <MagneticButton
              href={localePath(lang, "/contact")}
              className="btn btn--solid"
            >
              {cta.buttonLabel} <span className="btn__arrow">→</span>
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
