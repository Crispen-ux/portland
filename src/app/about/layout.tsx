import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Portland Schools Johannesburg",
  description:
    "Learn about Portland Schools — our values, mission, and commitment to providing quality CAPS education in Johannesburg from Grade RR to Grade 11.",
  openGraph: {
    title: "About Us | Portland Schools Johannesburg",
    description:
      "Discover our values, mission, and commitment to quality education in Johannesburg.",
    type: "website",
    locale: "en_ZA",
  },
  alternates: {
    canonical: "https://www.portlandschools.co.za/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
