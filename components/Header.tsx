"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import { langFromPath, localePath, switchPath, ui } from "@/lib/i18n";

function normalize(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export default function Header() {
  const pathname = normalize(usePathname() || "/");
  const lang = langFromPath(pathname);
  const s = ui[lang];
  const other = switchPath(pathname);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // "Contact" is not listed here — the CTA button beside these links goes to
  // the contact page, and it is still in the footer.
  const links = [
    { href: localePath(lang, "/"), label: s.nav.home },
    { href: localePath(lang, "/team"), label: s.nav.team },
    { href: localePath(lang, "/news"), label: s.nav.news },
    { href: localePath(lang, "/gallery"), label: s.nav.gallery },
  ];

  // Adaptive header: ink over the dark hero/page-header, paper once scrolled past.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close drawer on Escape when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keep <html lang> correct for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  }, [lang]);

  const isActive = (href: string) => normalize(href) === pathname;

  return (
    <>
      <header className={`site-header${scrolled ? "" : " on-ink"}`}>
        <nav className="nav" aria-label="Primary">
          <Link
            className="brand"
            href={localePath(lang, "/")}
            onClick={() => setOpen(false)}
          >
            <Image
              className="brand__logo"
              src={logo}
              alt="DF Group"
              width={30}
              height={30}
              priority
            />
            <span className="brand__mark">DF Group</span>
          </Link>

          <button
            className="nav__toggle"
            aria-label={s.openMenu}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav__wrap${open ? " open" : ""}`} id="menu">
            <button
              className="nav__close"
              aria-label={s.closeMenu}
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            <ul className="nav__links">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="nav__end">
              <Link
                className="nav__lang"
                href={other.href}
                hrefLang={other.lang}
                aria-label={s.switchLabel}
                onClick={() => setOpen(false)}
              >
                {s.switchTo}
              </Link>
              <Link
                className="nav__cta"
                href={localePath(lang, "/contact")}
                aria-current={
                  isActive(localePath(lang, "/contact")) ? "page" : undefined
                }
                onClick={() => setOpen(false)}
              >
                {s.navCta}
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <div
        className={`nav__scrim${open ? " open" : ""}`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
    </>
  );
}
