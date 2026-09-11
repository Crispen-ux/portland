import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Portland Group of Schools | We Believe In Your Child",
  description:
    "Portland Group of Schools — a combined school in Johannesburg offering quality education from Grade RR to Grade 11. CAPS Curriculum. English-Medium. We believe in your child.",
  keywords: [
    "Portland Group of Schools",
    "Johannesburg school",
    "Grade RR to Grade 11",
    "CAPS curriculum",
    "English-medium school",
    "affordable private school Johannesburg",
  ],
  openGraph: {
    title: "Portland Group of Schools | We Believe In Your Child",
    description:
      "Quality education from Grade RR to Grade 11. CAPS Curriculum. English-Medium. We believe in your child.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-portland-red focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-portland-red focus:ring-offset-2"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
