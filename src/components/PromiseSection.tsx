"use client";

import { useInView } from "@/lib/useInView";
import { PROMISES } from "@/lib/constants";
import { Heart, BookOpen, Brain, Shield, Handshake, Rocket } from "lucide-react";

const ICONS = [Heart, BookOpen, Brain, Shield, Handshake, Rocket];

export default function PromiseSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-portland-red/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-portland-red font-semibold text-sm uppercase tracking-widest mb-4">
            What We Stand For
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark mb-4">
            OUR PROMISE
          </h2>
          <div className="w-20 h-1 bg-portland-red rounded-full mx-auto" />
        </div>

        {/* Promise cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PROMISES.map((promise, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                className={`card-premium group cursor-default transition-all duration-700 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 bg-portland-red/8 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-portland-red group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-portland-red group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-portland-dark font-medium leading-relaxed">
                  {promise}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quote */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl text-portland-red/20 font-serif">
              &ldquo;
            </div>
            <blockquote className="text-xl sm:text-2xl text-portland-dark/80 italic leading-relaxed px-8">
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
