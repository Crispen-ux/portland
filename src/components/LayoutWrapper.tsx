"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import ScrollProgress from "@/components/ScrollProgress";
import ExitPopup from "@/components/ExitPopup";

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];
const PORTAL_ROUTES = ["/admin", "/teacher", "/parent", "/student"];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isPortal = PORTAL_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

  if (isAuthPage || isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#D10000] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D10000] focus:ring-offset-2"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <ExitPopup />
      <ChatBot />
    </>
  );
}
