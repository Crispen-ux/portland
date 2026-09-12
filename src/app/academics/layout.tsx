import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics & School Life | Portland Schools Johannesburg",
  description:
    "Explore academics at Portland Schools — CAPS curriculum, Grade RR–11, English-medium education, sports, activities, and school life in Johannesburg.",
  openGraph: {
    title: "Academics & School Life | Portland Schools Johannesburg",
    description:
      "CAPS curriculum from Grade RR to Grade 11. English-medium education with sports, activities, and enriching school life.",
    type: "website",
    locale: "en_ZA",
  },
  alternates: {
    canonical: "https://www.portlandschools.co.za/academics",
  },
};

export default function AcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
