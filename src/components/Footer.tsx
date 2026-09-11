"use client";

import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { MapPin, Phone, Mail, Heart, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <footer className="relative bg-portland-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-portland-red/5 via-transparent to-portland-red/5 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-5" aria-label="Portland Group of Schools — Home">
                <div className="w-10 h-10 bg-portland-red rounded-xl flex items-center justify-center overflow-hidden">
                  <img src="/logo.pdf" alt="" className="w-8 h-8 object-contain" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm leading-tight">PORTLAND</p>
                  <p className="text-[10px] text-white/50 font-medium tracking-widest uppercase">Group of Schools</p>
                </div>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed mb-4">{SITE.grades}</p>
              <p className="text-white/60 text-sm leading-relaxed">{SITE.curriculum}</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 hover:text-portland-red-light text-sm transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-portland-red mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-white/60 text-sm">{SITE.address}</p>
                    <p className="text-white/60 text-sm">{SITE.addressLine2}</p>
                    <p className="text-white/60 text-sm">{SITE.city}</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-portland-red shrink-0" aria-hidden="true" />
                  <a href={`tel:${SITE.phone}`} className="text-white/60 hover:text-white text-sm transition-colors" aria-label={`Call ${SITE.phone}`}>
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-portland-red shrink-0" aria-hidden="true" />
                  <a href={`mailto:${SITE.email}`} className="text-white/60 hover:text-white text-sm transition-colors" aria-label={`Email ${SITE.email}`}>
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Ready to Enrol?</h4>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                Give your child the Portland advantage. Admissions are open for Grade RR – Grade 11.
              </p>
              <Link href="/admissions" className="btn-primary text-sm w-full justify-center">
                ENROL NOW
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm">
                &copy; {new Date().getFullYear()} Portland Group of Schools. All rights reserved.
              </p>
              <p className="text-white/40 text-sm flex items-center gap-1.5">
                Made with <Heart className="w-3.5 h-3.5 text-portland-red fill-portland-red" aria-hidden="true" /> in Johannesburg
              </p>
            </div>
          </div>
        </div>
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-24 right-5 z-40 w-12 h-12 bg-portland-dark rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:bg-portland-red ${
          showTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 text-white" />
      </button>
    </>
  );
}
