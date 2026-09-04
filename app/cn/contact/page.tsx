import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import contact from "@/content/cn/contact.json";

export const metadata: Metadata = {
  title: "聯絡我們 — DF Group",
  description: "歡迎與 DF Group 聯絡。",
};

export default function Page() {
  return <ContactPage lang="zh" contact={contact} />;
}
