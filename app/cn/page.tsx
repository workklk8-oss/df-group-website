import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import home from "@/content/cn/home.json";
import partners from "@/content/cn/partners.json";

export const metadata: Metadata = {
  title: "DF Group · 香港",
  description:
    "DF Group 結合全球顧問網絡、耐心資本與親身參與的執行力，建立並支持企業。",
};

export default function Page() {
  return <HomePage lang="zh" home={home} partners={partners} />;
}
