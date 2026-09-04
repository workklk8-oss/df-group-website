"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.png";
import { langFromPath, localePath, ui } from "@/lib/i18n";
import siteEn from "@/content/site.json";
import siteZh from "@/content/zh/site.json";

export default function Footer() {
  const lang = langFromPath(usePathname() || "/");
  const s = ui[lang];
  const site = lang === "zh" ? siteZh : siteEn;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Link className="brand" href={localePath(lang, "/")}>
              <Image
                className="brand__logo"
                src={logo}
                alt="DF Group"
                width={34}
                height={34}
              />
              <span className="brand__mark">DF Group</span>
            </Link>
            <p className="footer__blurb">{site.footerBlurb}</p>
          </div>
          <div className="footer__col">
            <h4>{s.footerExplore}</h4>
            <ul>
              <li>
                <Link href={localePath(lang, "/")}>{s.nav.home}</Link>
              </li>
              <li>
                <Link href={localePath(lang, "/team")}>{s.nav.team}</Link>
              </li>
              <li>
                <Link href={localePath(lang, "/news")}>{s.nav.news}</Link>
              </li>
              <li>
                <Link href={localePath(lang, "/gallery")}>{s.nav.gallery}</Link>
              </li>
              <li>
                <Link href={localePath(lang, "/contact")}>
                  {s.footerContact}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>{s.footerConnect}</h4>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/company/df-group-diligentfaith/"
                  target="_blank"
                  rel="noopener"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href={localePath(lang, "/contact")}>
                  {s.footerEnquiries}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>{site.footerCopyright}</span>
          <span>{site.footerLocation}</span>
        </div>
      </div>
    </footer>
  );
}
