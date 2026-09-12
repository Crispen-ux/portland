"use client";

import Link from "next/link";
import { SITE } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-portland-dark">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-portland-red/8" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-portland-red/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="animate-fade-up mb-6">
            <span className="text-eyebrow text-portland-red-light tracking-[0.2em]">
              Admissions Open — {SITE.grades}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-display text-white mb-8 animate-fade-up delay-100">
            Where Every
            <br />
            Child Is{" "}
            <span className="relative inline-block">
              <span className="text-gradient bg-gradient-to-r from-portland-red-light to-[#FF6B6B] bg-clip-text text-transparent">
                Known.
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-portland-red-light to-transparent rounded-full" />
            </span>
          </h1>

          {/* Supporting text */}
          <p className="text-lg sm:text-xl text-white/60 max-w-lg mb-12 leading-relaxed animate-fade-up delay-200">
            {SITE.subtitle} We&apos;re committed to helping them become
            everything they&apos;re capable of becoming.
          </p>

          {/* School info line */}
          <div className="animate-fade-up delay-300 mb-10">
            <p className="text-white/40 text-sm uppercase tracking-widest font-medium">
              {SITE.grades} · {SITE.curriculum}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-400">
            <Link href="/admissions" className="btn-primary text-base !py-4 !px-8 group">
              Begin Their Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base !py-4 !px-8"
            >
              Chat With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
