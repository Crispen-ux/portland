"use client";

import { useInView } from "@/lib/useInView";
import { PROMISES } from "@/lib/constants";
import { Heart, BookOpen, Brain, Shield, Handshake, Rocket } from "lucide-react";

const ICONS = [Heart, BookOpen, Brain, Shield, Handshake, Rocket];

export default function PromiseSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
            What We Stand For
          </span>
          <h2 className="text-editorial text-portland-dark mb-4">
            Our Promise
          </h2>
        </div>

        {/* Promise cards — clean editorial style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PROMISES.map((promise, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                className={`group p-6 bg-portland-light/50 rounded-2xl border border-portland-mid/30 hover:border-portland-red/20 hover:bg-white hover:shadow-editorial transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 bg-portland-red/8 rounded-xl flex items-center justify-center mb-4 group-hover:bg-portland-red transition-colors duration-300">
                  <Icon className="w-5 h-5 text-portland-red group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-portland-dark font-medium text-sm leading-relaxed">
                  {promise}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quote — editorial serif style */}
        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl text-portland-red/15 font-serif">
              &ldquo;
            </div>
            <blockquote className="text-xl sm:text-2xl text-portland-dark/70 italic leading-relaxed px-8">
              We believe that true education nurtures character as much as
              competence, and that children thrive when schools and parents work
              in meaningful partnership.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
