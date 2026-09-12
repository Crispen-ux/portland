import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos | Portland Schools Johannesburg",
  description:
    "Explore life at Portland Schools through photos — classrooms, sports, activities, and our Johannesburg school community.",
  openGraph: {
    title: "Photos | Portland Schools Johannesburg",
    description:
      "See our learners, classrooms, sports, activities, and school community in Johannesburg.",
    type: "website",
    locale: "en_ZA",
  },
  alternates: {
    canonical: "https://www.portlandschools.co.za/photos",
  },
};

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
