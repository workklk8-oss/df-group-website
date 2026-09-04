import HomePage from "@/components/pages/HomePage";
import home from "@/content/home.json";
import partners from "@/content/partners.json";

export default function Page() {
  return <HomePage lang="en" home={home} partners={partners} />;
}
