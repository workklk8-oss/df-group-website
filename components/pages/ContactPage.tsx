import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import type { Lang } from "@/lib/i18n";

type ContactContent = typeof import("@/content/contact.json");

export default function ContactPage({
  lang,
  contact,
}: {
  lang: Lang;
  contact: ContactContent;
}) {
  return (
    <>
      <section className="pagehead">
        <div className="pagehead__wash" aria-hidden="true" />
        <div className="pagehead__inner">
          <p className="eyebrow eyebrow--onink">{contact.eyebrow}</p>
          <h1 className="display">{contact.heading}</h1>
          <p className="lede">{contact.lede}</p>
          <div className="pagehead__rule" />
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap contact-grid">
          <Reveal className="contact-block">
            {contact.details.map((d) => (
              <div className="contact-item" key={d.label}>
                <div className="k">{d.label}</div>
                <div className="v">
                  {d.link ? (
                    <a
                      href={d.link}
                      {...(d.link.startsWith("http")
                        ? { target: "_blank", rel: "noopener" }
                        : {})}
                    >
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal>
            <ContactForm
              lang={lang}
              topics={contact.topics.map((t) => t.label)}
              note={contact.formNote}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
