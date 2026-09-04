"use client";

import { useState } from "react";
import { ui, type Lang } from "@/lib/i18n";

const FORM_NAME = "contact";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

/**
 * Netlify Forms submission. The markup below carries the attributes Netlify
 * looks for at deploy time (name, data-netlify, and the hidden form-name
 * field); submitting posts back to the site so enquiries are captured in the
 * Netlify dashboard and emailed on, with no mail app needed on the visitor's
 * machine.
 */
export default function ContactForm({
  lang,
  topics,
  note,
}: {
  lang: Lang;
  topics: string[];
  note: string;
}) {
  const s = ui[lang].form;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(topics[0] ?? "");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Netlify accepts AJAX form posts at the site root.
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": FORM_NAME,
          name,
          email,
          topic,
          message,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="form-sent" role="status">
        <p className="eyebrow eyebrow--dim">{s.sentEyebrow}</p>
        <p className="statement" style={{ marginTop: 16, maxWidth: "20ch" }}>
          {s.sentHeading}
        </p>
        <p className="form__note" style={{ marginTop: 18 }}>
          {s.sentBody} <strong>{email || s.sentFallback}</strong>{s.shortly}
        </p>
      </div>
    );
  }

  return (
    <form
      className="form"
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      {/* Tells Netlify which form this submission belongs to */}
      <input type="hidden" name="form-name" value={FORM_NAME} />
      {/* Spam honeypot — hidden from people, tempting to bots */}
      <p hidden>
        <label>
          Don&rsquo;t fill this in: <input name="bot-field" />
        </label>
      </p>

      <div className="field">
        <label htmlFor="cf-name">{s.name}</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          placeholder={s.namePlaceholder}
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="cf-email">{s.email}</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          placeholder={s.emailPlaceholder}
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="cf-topic">{s.topic}</label>
        <select
          id="cf-topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-msg">{s.message}</label>
        <textarea
          id="cf-msg"
          name="message"
          placeholder={s.messagePlaceholder}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          className="btn btn--dark"
          disabled={status === "sending"}
        >
          {status === "sending" ? s.sending : s.send}{" "}
          <span className="btn__arrow">→</span>
        </button>
      </div>

      {status === "error" && (
        <p className="form__note form__note--error" role="alert">
          {s.error}{" "}
          <a href="mailto:admin@diligentfaith.com">admin@diligentfaith.com</a>.
        </p>
      )}

      <p className="form__note">{note}</p>
    </form>
  );
}
