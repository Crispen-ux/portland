"use client";

import Link from "next/link";
import { SITE } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-section relative min-h-[100vh] flex items-center overflow-hidden bg-[#D10000]">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl text-left">
          {/* Eyebrow */}
          <div className="animate-fade-up mb-6">
            <span className="text-eyebrow text-white tracking-[0.2em]">
              Admissions Open — {SITE.grades}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-display text-white mb-8 animate-fade-up delay-100">
            We believe in your{" "}
            <span className="relative inline-block">
              <span className="text-white">
                child
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-white to-transparent rounded-full" />
            </span>
          </h1>

          {/* Supporting text */}
          <p className="text-lg sm:text-xl text-white/90 max-w-lg mb-12 leading-relaxed animate-fade-up delay-200">
            {SITE.subtitle} We&apos;re committed to helping them become
            everything they&apos;re capable of becoming.
          </p>

          {/* School info line */}
          <div className="animate-fade-up delay-300 mb-6">
            <p className="text-white/80 text-sm uppercase tracking-widest font-medium">
              {SITE.grades} · {SITE.curriculum}
            </p>
          </div>

          {/* Free uniform hook */}
          <div className="animate-fade-up delay-400 mb-10 inline-flex items-center gap-3 bg-white/15 border border-white/20 rounded-full px-5 py-2.5">
            <span className="text-green-300 text-sm font-bold">✓</span>
            <span className="text-white text-sm font-medium">Free School Uniform — included with every enrolment</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-500">
            <Link href="/admissions" className="btn-primary text-base !py-4 !px-8 group">
              Register Now
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
