import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions | Portland Schools Johannesburg",
  description:
    "Enrol your child at Portland Schools. We offer CAPS education from Grade RR to Grade 11 in Johannesburg. Start your enquiry today.",
  openGraph: {
    title: "Admissions | Portland Schools Johannesburg",
    description:
      "Start your child's journey at Portland Schools. CAPS education from Grade RR to Grade 11.",
    type: "website",
    locale: "en_ZA",
  },
  alternates: {
    canonical: "https://www.portlandschools.co.za/admissions",
  },
};

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
