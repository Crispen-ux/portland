import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Portland Schools | Johannesburg",
  description:
    "Contact Portland Schools in Johannesburg. Call +27 82 815 4388, WhatsApp us, or email info@portlandschools.co.za. Book a school visit today.",
  openGraph: {
    title: "Contact Portland Schools | Johannesburg",
    description:
      "Get in touch with Portland Schools. Call, WhatsApp, or email us to learn about admissions and fees.",
    type: "website",
    locale: "en_ZA",
  },
  alternates: {
    canonical: "https://www.portlandschools.co.za/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
