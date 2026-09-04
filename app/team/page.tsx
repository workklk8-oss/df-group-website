import type { Metadata } from "next";
import TeamPage from "@/components/pages/TeamPage";
import team from "@/content/team.json";
import site from "@/content/site.json";

export const metadata: Metadata = {
  title: "Team — DF Group",
  description:
    "Leadership with decades of banking and finance experience, supported by advisors and researchers across sectors.",
};

export default function Page() {
  return <TeamPage lang="en" team={team} site={site} />;
}
