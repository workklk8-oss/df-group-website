export type Lang = "en" | "zh";

/** Prefix a path for the given language. English lives at the root. */
export function localePath(lang: Lang, path: string): string {
  const clean = path === "/" ? "" : path;
  return lang === "zh" ? `/zh${clean}` || "/zh" : path || "/";
}

/** Given the current pathname, return the equivalent page in the other language. */
export function switchPath(pathname: string): { lang: Lang; href: string } {
  const p = pathname.replace(/\/$/, "") || "/";
  if (p === "/zh" || p.startsWith("/zh/")) {
    const rest = p.slice(3) || "/";
    return { lang: "en", href: rest };
  }
  return { lang: "zh", href: `/zh${p === "/" ? "" : p}` || "/zh" };
}

export function langFromPath(pathname: string): Lang {
  const p = pathname.replace(/\/$/, "");
  return p === "/zh" || p.startsWith("/zh/") ? "zh" : "en";
}

/** Interface text that does not live in the editable content files. */
export const ui = {
  en: {
    nav: { home: "Home", team: "Team", news: "News", gallery: "Gallery" },
    navCta: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
    switchTo: "中文",
    switchLabel: "切换到中文",
    footerExplore: "Explore",
    footerConnect: "Connect",
    footerEnquiries: "Enquiries",
    footerContact: "Contact",
    analyst: "Analyst",
    galleryEmpty: "Photos coming soon.",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      topic: "I’m reaching out about",
      message: "Message",
      messagePlaceholder: "A few lines about what you’re working on.",
      send: "Send message",
      sending: "Sending…",
      sentEyebrow: "Message sent",
      sentHeading: "Thank you — we’ll be in touch.",
      sentBody: "We’ve received your message and will reply to",
      sentFallback: "the address you provided",
      shortly: "shortly.",
      error: "Sorry — something went wrong sending that. Please email us directly at",
    },
  },
  zh: {
    nav: { home: "首頁", team: "團隊", news: "動態", gallery: "圖庫" },
    navCta: "聯絡我們",
    openMenu: "開啟選單",
    closeMenu: "關閉選單",
    skip: "跳至內容",
    switchTo: "EN",
    switchLabel: "Switch to English",
    footerExplore: "瀏覽",
    footerConnect: "聯繫",
    footerEnquiries: "查詢",
    footerContact: "聯絡我們",
    analyst: "分析師",
    galleryEmpty: "照片即將上載。",
    form: {
      name: "姓名",
      namePlaceholder: "您的姓名",
      email: "電郵",
      emailPlaceholder: "you@company.com",
      topic: "查詢事項",
      message: "訊息",
      messagePlaceholder: "請簡述您正在進行的項目。",
      send: "發送訊息",
      sending: "發送中…",
      sentEyebrow: "訊息已發送",
      sentHeading: "感謝您的來訊，我們會盡快回覆。",
      sentBody: "我們已收到您的訊息，並會回覆至",
      sentFallback: "您提供的電郵地址",
      shortly: "。",
      error: "很抱歉，發送時出現問題。請直接電郵至",
    },
  },
} as const;
