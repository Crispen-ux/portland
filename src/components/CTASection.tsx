"use client";

import { useInView } from "@/lib/useInView";
import { SITE } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/Soccer.jpeg"
          alt="Portland learners celebrating"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-portland-dark/90 via-portland-dark/80 to-portland-dark/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            We Believe In{" "}
            <span className="text-portland-red-light">Your Child.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/70 mb-3">
            Now let&apos;s build their future together.
          </p>
          <p className="text-white/50 text-base mb-10">
            Admissions are open for {SITE.grades}.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="btn-primary text-base !py-4 !px-10 group"
            >
              Begin Their Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base !py-4 !px-10"
            >
              Chat With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
