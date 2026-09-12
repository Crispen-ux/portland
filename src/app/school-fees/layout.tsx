import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Fees | Portland Schools Johannesburg",
  description:
    "View Portland Schools fees: R800/month (Grade RR–7), R900/month (Grade 8–11). R500 registration. R300 sports levy. Free school uniform included.",
  openGraph: {
    title: "School Fees | Portland Schools Johannesburg",
    description:
      "Affordable private school fees in Johannesburg. R800–R900 per month. Free school uniform included.",
    type: "website",
    locale: "en_ZA",
  },
  alternates: {
    canonical: "https://www.portlandschools.co.za/school-fees",
  },
};

export default function SchoolFeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
