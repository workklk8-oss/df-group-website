import type { Metadata } from "next";
import GalleryPage from "@/components/pages/GalleryPage";
import gallery from "@/content/cn/gallery.json";
import site from "@/content/cn/site.json";

export const metadata: Metadata = {
  title: "圖庫 — DF Group",
  description: "來自 DF Group 各地的活動、聚會與里程碑。",
};

export default function Page() {
  return <GalleryPage lang="zh" gallery={gallery} site={site} />;
}
