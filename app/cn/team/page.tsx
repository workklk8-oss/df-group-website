import type { Metadata } from "next";
import TeamPage from "@/components/pages/TeamPage";
import team from "@/content/cn/team.json";
import site from "@/content/cn/site.json";

export const metadata: Metadata = {
  title: "團隊 — DF Group",
  description: "領導層具備數十年銀行與金融經驗，並由各領域的顧問與研究員支持。",
};

export default function Page() {
  return <TeamPage lang="zh" team={team} site={site} />;
}
