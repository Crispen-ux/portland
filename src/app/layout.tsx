import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import LayoutWrapper from "@/components/LayoutWrapper";
import { SITE } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://www.portlandschools.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Portland Schools | Affordable Private School in Johannesburg",
    template: "%s | Portland Schools Johannesburg",
  },
  description:
    "Discover Portland Schools, an affordable private school in Johannesburg offering CAPS education from Grade RR to Grade 11. English-medium. Free school uniform included.",
  keywords: [
    "private schools Johannesburg",
    "affordable private school Johannesburg",
    "CAPS school Johannesburg",
    "English medium school Johannesburg",
    "primary school Johannesburg",
    "high school Johannesburg",
    "Grade RR to Grade 11",
    "school fees Johannesburg",
    "school admissions Johannesburg",
  ],
  openGraph: {
    title: "Portland Schools | Affordable Private School in Johannesburg",
    description:
      "Affordable private school in Johannesburg. CAPS education from Grade RR to Grade 11. English-medium. Free school uniform included.",
    url: siteUrl,
    siteName: "Portland Schools",
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Portland Schools — Where Every Child Is Known",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portland Schools | Affordable Private School in Johannesburg",
    description:
      "Affordable private school in Johannesburg. CAPS education from Grade RR to Grade 11.",
  },
  icons: {
    icon: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const schoolSchema = {
  "@context": "https://schema.org",
  "@type": "School",
  name: SITE.name,
  description: "Affordable private school in Johannesburg offering CAPS education from Grade RR to Grade 11. English-medium. Free school uniform included.",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/School 1.jpeg`,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressLocality: SITE.city,
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -26.2041,
    longitude: 28.0473,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "15:30",
    },
  ],
  priceRange: "R800 - R900 per month",
  curriculum: "CAPS",
  educationalLevel: "Grade RR to Grade 11",
  hasMap: `https://www.google.com/maps?q=${encodeURIComponent("188 Commissioner Street, Corner Commissioner and Polly Street, Johannesburg")}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
