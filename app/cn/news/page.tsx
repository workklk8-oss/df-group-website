import type { Metadata } from "next";
import NewsPage from "@/components/pages/NewsPage";
import news from "@/content/cn/news.json";
import site from "@/content/cn/site.json";

export const metadata: Metadata = {
  title: "動態 — DF Group",
  description: "來自 DF Group 網絡的公告、任命與精彩時刻。",
};

export default function Page() {
  return <NewsPage news={news} site={site} />;
}
