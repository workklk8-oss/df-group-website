import type { Metadata } from "next";
import GalleryPage from "@/components/pages/GalleryPage";
import gallery from "@/content/gallery.json";
import site from "@/content/site.json";

export const metadata: Metadata = {
  title: "Gallery — DF Group",
  description: "Events, convenings, and milestones from across DF Group.",
};

export default function Page() {
  return <GalleryPage lang="en" gallery={gallery} site={site} />;
}
