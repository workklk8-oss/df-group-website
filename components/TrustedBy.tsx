// Moving "Trusted by" logo strip. The logos live in content/partners.json and
// are editable in the CMS — add, remove, reorder, or upload new images with no
// code. Pure-CSS infinite marquee (see globals.css); pauses on hover, brightens
// the hovered logo, and stops entirely for reduced-motion visitors.


type Logo = { name: string; image: string };

export default function TrustedBy({
  eyebrow = "Trusted by founders & partners",
  logos: input,
}: {
  eyebrow?: string;
  logos: readonly Logo[];
}) {
  const logos = input.filter((l) => l.image);
  if (logos.length === 0) return null;

  // Rendered twice so the CSS translateX(-50%) loops seamlessly.
  const track = [...logos, ...logos];

  return (
    <section className="section--card trusted">
      <div className="wrap trusted__head">
        <p className="eyebrow eyebrow--dim">{eyebrow}</p>
      </div>
      <div className="marquee" aria-label="Partners and portfolio companies">
        <div className="marquee__track">
          {track.map((l, i) => (
            <div className="marquee__item" key={`${l.image}-${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.image} alt={i < logos.length ? l.name : ""} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
