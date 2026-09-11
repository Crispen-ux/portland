"use client";

import Link from "next/link";
import { SITE } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/School 1.jpeg"
          alt="Portland learners at school"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-portland-dark/90 via-portland-dark/70 to-portland-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-portland-dark/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="animate-fade-up mb-6">
            <span className="text-eyebrow text-portland-red-light tracking-[0.2em]">
              Admissions Open — {SITE.grades}
            </span>
          </div>

          {/* Main heading — editorial display */}
          <h1 className="text-display text-white mb-8 animate-fade-up delay-100">
            Where Every
            <br />
            Child Is{" "}
            <span className="relative">
              <span className="text-gradient bg-gradient-to-r from-portland-red-light to-[#FF6B6B] bg-clip-text text-transparent">
                Known.
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-portland-red-light to-transparent rounded-full" />
            </span>
          </h1>

          {/* Supporting text */}
          <p className="text-lg sm:text-xl text-white/70 max-w-lg mb-12 leading-relaxed animate-fade-up delay-200">
            {SITE.subtitle} We&apos;re committed to helping them become
            everything they&apos;re capable of becoming.
          </p>

          {/* School info line */}
          <div className="animate-fade-up delay-300 mb-10">
            <p className="text-white/50 text-sm uppercase tracking-widest font-medium">
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
