"use client";

import { useInView } from "@/lib/useInView";
import { SITE } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeesSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-portland-dark">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-eyebrow text-portland-red-light tracking-[0.2em] mb-4 block">
            Fees
          </span>
          <h2 className="text-editorial text-white">
            Quality Education.{" "}
            <span className="text-gradient bg-gradient-to-r from-portland-red-light to-[#FF6B6B] bg-clip-text text-transparent">
              Accessible Fees.
            </span>
          </h2>
        </div>

        {/* Fee cards — clean editorial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Grade RR - 7 */}
          <div
            className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/8 transition-all duration-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3 font-medium">
              Grade RR – Grade 7
            </p>
            <p className="text-5xl sm:text-6xl font-extrabold text-white mb-2">
              {SITE.fees.gradeRRto7}
              <span className="text-lg text-white/40 font-normal">/month</span>
            </p>
          </div>

          {/* Grade 8 - 11 */}
          <div
            className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/8 transition-all duration-500 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3 font-medium">
              Grade 8 – Grade 11
            </p>
            <p className="text-5xl sm:text-6xl font-extrabold text-white mb-2">
              {SITE.fees.grade8to11}
              <span className="text-lg text-white/40 font-normal">/month</span>
            </p>
          </div>
        </div>

        {/* Additional fees */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-2.5">
            <span className="text-white/40 text-sm">Registration: </span>
            <span className="text-white font-semibold text-sm">{SITE.fees.registration} once-off</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-2.5">
            <span className="text-white/40 text-sm">Sports Levy: </span>
            <span className="text-white font-semibold text-sm">{SITE.fees.sportsLevy} per year</span>
          </div>
          <div className="bg-portland-red/15 border border-portland-red/25 rounded-xl px-5 py-2.5">
            <span className="text-white font-semibold text-sm">✓ FREE SCHOOL UNIFORM</span>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/admissions"
            className="btn-primary text-base !py-4 !px-10 group"
          >
            Enrol Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
