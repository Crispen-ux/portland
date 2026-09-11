"use client";

import Link from "next/link";
import { SITE } from "@/lib/constants";
import { MapPin, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/School 1.jpeg"
          alt="Happy Portland learners in classroom"
          className="w-full h-full object-cover"
        />
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-portland-dark/90 via-portland-dark/70 to-portland-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-portland-dark/80 via-transparent to-transparent" />
      </div>

      {/* Decorative red accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-portland-red/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 mb-8 animate-fade-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Admissions Open — {SITE.grades}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.05] mb-6 animate-fade-up delay-100">
            WE BELIEVE IN{" "}
            <span className="relative inline-block">
              <span className="text-gradient bg-gradient-to-r from-portland-red-light to-[#FF6B6B] bg-clip-text text-transparent">
                YOUR CHILD.
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-portland-red-light to-transparent rounded-full" />
            </span>
          </h1>

          {/* Supporting text */}
          <p className="text-lg sm:text-xl text-white/80 max-w-xl mb-10 leading-relaxed animate-fade-up delay-200">
            And we&apos;re committed to helping them become everything
            they&apos;re capable of becoming.
          </p>

          {/* School info */}
          <div className="animate-fade-up delay-300">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              PORTLAND GROUP OF SCHOOLS
            </h2>
            <p className="text-white/70 text-lg mb-1">{SITE.grades}</p>
            <p className="text-white/60 text-base mb-4">{SITE.curriculum}</p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="w-4 h-4 text-portland-red" />
              <span>
                {SITE.address}, {SITE.addressLine2}, {SITE.city}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-up delay-400">
            <Link href="/admissions" className="btn-primary text-lg !py-4 !px-8 group">
              ENROL NOW
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg !py-4 !px-8"
            >
              WHATSAPP US
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
