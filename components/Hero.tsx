"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Counter from "./Counter";
import MagneticButton from "./MagneticButton";
import { withEmphasis } from "@/lib/emphasis";
import { localePath, type Lang } from "@/lib/i18n";

type HeroContent = {
  eyebrow: string;
  heading: string;
  lede: string;
  primaryLabel: string;
  secondaryLabel: string;
};
type Stat = { value: string; label: string };

/** "100+" -> counts up to 100 then shows "+". Non-numeric values render as-is. */
function StatValue({ value }: { value: string }) {
  const m = value.match(/^(\d+)(\D*)$/);
  if (!m) return <>{value}</>;
  return <Counter value={parseInt(m[1], 10)} suffix={m[2]} />;
}

export default function Hero({
  lang,
  hero,
  stats,
}: {
  lang: Lang;
  hero: HeroContent;
  stats: readonly Stat[];
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Subtle parallax drift on the atmospheric brass wash + skyline.
  const washY = useTransform(scrollY, [0, 600], [0, 120]);
  const skyY = useTransform(scrollY, [0, 600], [0, 70]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay },
        };

  return (
    <section className="hero">
      <motion.div
        className="hero__sky"
        style={reduce ? undefined : { y: skyY }}
        aria-hidden="true"
      >
        <div className="hero__sky-img" />
      </motion.div>
      <motion.div
        className="hero__wash"
        style={reduce ? undefined : { y: washY }}
        aria-hidden="true"
      />
      <div className="hero__grid">
        <motion.p
          className="eyebrow eyebrow--onink hero__eyebrow"
          {...rise(0.05)}
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1 className="display" {...rise(0.15)}>
          {withEmphasis(hero.heading)}
        </motion.h1>

        <motion.p className="lede lede--onink hero__lede" {...rise(0.28)}>
          {hero.lede}
        </motion.p>

        <motion.div className="hero__actions" {...rise(0.4)}>
          <MagneticButton href="#practice" className="btn btn--solid">
            {hero.primaryLabel} <span className="btn__arrow">→</span>
          </MagneticButton>
          <Link className="txtlink" href={localePath(lang, "/contact")}>
            {hero.secondaryLabel}
          </Link>
        </motion.div>

        <div className="horizon" aria-hidden="true">
          <motion.div
            className="horizon__rule"
            initial={reduce ? undefined : { scaleX: 0 }}
            animate={reduce ? undefined : { scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1], delay: 0.3 }}
          />
          <motion.div
            className="horizon__node"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          />
        </div>

        <motion.div className="hero__stats" {...rise(0.5)}>
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__k">
                <StatValue value={s.value} />
              </div>
              <div className="stat__l">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
