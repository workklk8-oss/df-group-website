export type Lang = "en" | "zh";

/**
 * URL segment for the Chinese pages. The language *code* stays "zh" (that is
 * the correct value for <html lang> and hreflang); only the visible URL uses
 * "cn" because it reads better for the audience.
 */
export const ZH_PREFIX = "/cn";

/** Prefix a path for the given language. English lives at the root. */
export function localePath(lang: Lang, path: string): string {
  const clean = path === "/" ? "" : path;
  return lang === "zh" ? `${ZH_PREFIX}${clean}` || ZH_PREFIX : path || "/";
}

/** Given the current pathname, return the equivalent page in the other language. */
export function switchPath(pathname: string): { lang: Lang; href: string } {
  const p = pathname.replace(/\/$/, "") || "/";
  if (p === ZH_PREFIX || p.startsWith(`${ZH_PREFIX}/`)) {
    const rest = p.slice(ZH_PREFIX.length) || "/";
    return { lang: "en", href: rest };
  }
  return {
    lang: "zh",
    href: `${ZH_PREFIX}${p === "/" ? "" : p}` || ZH_PREFIX,
  };
}

export function langFromPath(pathname: string): Lang {
  const p = pathname.replace(/\/$/, "");
  return p === ZH_PREFIX || p.startsWith(`${ZH_PREFIX}/`) ? "zh" : "en";
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
    switchLabel: "切换到简体中文",
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
    nav: { home: "首页", team: "团队", news: "动态", gallery: "图库" },
    navCta: "联系我们",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    skip: "跳至内容",
    switchTo: "EN",
    switchLabel: "Switch to English",
    footerExplore: "浏览",
    footerConnect: "联系",
    footerEnquiries: "咨询",
    footerContact: "联系我们",
    analyst: "分析师",
    galleryEmpty: "照片即将上传。",
    form: {
      name: "姓名",
      namePlaceholder: "您的姓名",
      email: "电邮",
      emailPlaceholder: "you@company.com",
      topic: "咨询事项",
      message: "信息",
      messagePlaceholder: "请简述您正在进行的项目。",
      send: "发送信息",
      sending: "发送中…",
      sentEyebrow: "信息已发送",
      sentHeading: "感谢您的来信，我们会尽快回复。",
      sentBody: "我们已收到您的信息，并会回复至",
      sentFallback: "您提供的电邮地址",
      shortly: "。",
      error: "很抱歉，发送时出现问题。请直接发送电邮至",
    },
  },
} as const;
