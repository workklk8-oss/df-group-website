import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import home from "@/content/cn/home.json";
// Partner logos are images only, so both languages share one list.
import partners from "@/content/partners.json";

export const metadata: Metadata = {
  title: "DF Group · 香港",
  description:
    "DF Group 結合全球顧問網絡、耐心資本與親身參與的執行力，建立並支持企業。",
};

export default function Page() {
  return <HomePage lang="zh" home={home} partners={partners} />;
}
