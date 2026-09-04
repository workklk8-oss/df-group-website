import Reveal, { RevealItem } from "@/components/Reveal";
import { ui, type Lang } from "@/lib/i18n";

type Photo = { image: string; caption?: string };
type SiteContent = typeof import("@/content/site.json");

export default function GalleryPage({
  lang,
  gallery,
  site,
}: {
  lang: Lang;
  gallery: { photos: Photo[] };
  site: SiteContent;
}) {
  const g = site.galleryPage;
  const photos = gallery.photos.filter((p) => p.image);

  return (
    <>
      <section className="pagehead">
        <div className="pagehead__wash" aria-hidden="true" />
        <div className="pagehead__inner">
          <p className="eyebrow eyebrow--onink">{g.eyebrow}</p>
          <h1 className="display">{g.heading}</h1>
          <p className="lede">{g.lede}</p>
          <div className="pagehead__rule" />
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap">
          {photos.length === 0 ? (
            <Reveal>
              <p
                className="lede"
                style={{ margin: "0 auto", textAlign: "center" }}
              >
                {ui[lang].galleryEmpty}
              </p>
            </Reveal>
          ) : (
            <Reveal className="gallery" stagger>
              {photos.map((p, i) => (
                <RevealItem className="gallery__item" key={p.image + i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.caption || ""} loading="lazy" />
                  {p.caption ? (
                    <p className="gallery__caption">{p.caption}</p>
                  ) : null}
                </RevealItem>
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
