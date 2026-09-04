import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import contact from "@/content/contact.json";

export const metadata: Metadata = {
  title: "Contact — DF Group",
  description: "Get in touch with DF Group.",
};

export default function Page() {
  return <ContactPage lang="en" contact={contact} />;
}
