"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { Menu, X, LogIn } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)] py-3"
          : "bg-white/80 backdrop-blur-md py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Portland Group of Schools — Home">
          <img src="/logo.png" alt="Portland Group of Schools" className="h-12 w-auto" />
          <div className="hidden sm:block">
            <p className="font-bold text-portland-dark text-sm leading-tight tracking-tight">
              PORTLAND
            </p>
            <p className="text-[10px] text-portland-gray font-medium tracking-widest uppercase">
              Group of Schools
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-[13px] font-medium text-portland-dark/70 hover:text-portland-red rounded-lg hover:bg-portland-red/5 transition-all duration-300 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center ml-4 shrink-0 gap-3">
          <Link href="/login" className="flex items-center gap-1.5 text-[13px] font-medium text-portland-dark/70 hover:text-portland-red transition-colors">
            <LogIn className="w-4 h-4" />
            Portal Login
          </Link>
          <Link href="/admissions" className="btn-primary text-xs !py-2 !px-5">
            ENROL NOW
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-portland-red/5 transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-portland-dark" />
          ) : (
            <Menu className="w-5 h-5 text-portland-dark" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={`lg:hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-portland-mid/50">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 text-base font-medium text-portland-dark/80 hover:text-portland-red hover:bg-portland-red/5 rounded-xl transition-all duration-300 ${
                  isOpen ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-base font-medium text-portland-dark/80 hover:text-portland-red hover:bg-portland-red/5 rounded-xl transition-all duration-300"
            >
              <LogIn className="w-4 h-4" />
              Portal Login
            </Link>
            <Link
              href="/admissions"
              onClick={() => setIsOpen(false)}
              className="btn-primary justify-center mt-3 text-base"
            >
              ENROL NOW
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
