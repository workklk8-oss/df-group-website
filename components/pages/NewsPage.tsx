import Reveal, { RevealItem } from "@/components/Reveal";

type NewsContent = typeof import("@/content/news.json");
type SiteContent = typeof import("@/content/site.json");

export default function NewsPage({
  news,
  site,
}: {
  news: NewsContent;
  site: SiteContent;
}) {
  const n = site.newsPage;
  return (
    <>
      <section className="pagehead">
        <div className="pagehead__wash" aria-hidden="true" />
        <div className="pagehead__inner">
          <p className="eyebrow eyebrow--onink">{n.eyebrow}</p>
          <h1 className="display">{n.heading}</h1>
          <p className="lede">{n.lede}</p>
          <div className="pagehead__rule" />
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap">
          <Reveal className="entries" stagger>
            {news.entries.map((e) => (
              <RevealItem
                className="entry"
                as="a"
                key={e.title + e.date}
                href={e.href}
                target="_blank"
                rel="noopener"
              >
                <div className="entry__meta">
                  <span>{e.date}</span>
                  <span className="dot"></span>
                  <span className="entry__cat">{e.cat}</span>
                </div>
                <div>
                  <h2 className="entry__title">{e.title}</h2>
                  <p className="entry__excerpt">{e.excerpt}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
          <div style={{ marginTop: 44 }}>
            <a
              className="btn btn--dark"
              href={n.buttonLink}
              target="_blank"
              rel="noopener"
            >
              {n.buttonLabel} <span className="btn__arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
