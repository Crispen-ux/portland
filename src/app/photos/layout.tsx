import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos | Portland Schools",
  description:
    "Explore life at Portland Schools through photos of our learners, classrooms, activities, sports, technology and school community.",
  openGraph: {
    title: "Photos | Portland Schools",
    description:
      "Explore life at Portland Schools through photos of our learners, classrooms, activities, sports, technology and school community.",
    type: "website",
  },
};

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
