"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/lib/useInView";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Parent",
    role: "Grade 3 Parent",
    text: "Portland has been incredible for my child. The teachers genuinely care and my son has grown in confidence since joining. The fees are also very affordable for the quality of education.",
    initials: "P",
  },
  {
    name: "Parent",
    role: "Grade 7 Parent",
    text: "We chose Portland because of the values they teach. It's not just about academics — my daughter has learned discipline, respect and kindness. I couldn't be happier with our choice.",
    initials: "P",
  },
  {
    name: "Parent",
    role: "Grade 10 Parent",
    text: "The robotics and computer programmes at Portland are outstanding. My son is now passionate about technology and wants to study engineering. Thank you, Portland!",
    initials: "P",
  },
  {
    name: "Parent",
    role: "Grade R Parent",
    text: "Sending my little one to Portland was the best decision. The foundation phase teachers are warm, nurturing and really know how to make learning fun. She loves going to school every day.",
    initials: "P",
  },
  {
    name: "Parent",
    role: "Grade 11 Parent",
    text: "Portland feels like family. The teachers know every child by name, the sports programme is fantastic, and my son is being prepared for university and life beyond school.",
    initials: "P",
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView(0.1);
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const t = TESTIMONIALS[current];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-portland-cream">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
            What Parents Say
          </span>
          <h2 className="text-editorial text-portland-dark">
            Trusted by{" "}
            <span className="text-gradient">Families</span>
          </h2>
        </div>

        {/* Testimonial card — editorial large quote */}
        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-editorial relative">
            {/* Large quote mark */}
            <div className="absolute top-6 right-8 sm:top-8 sm:right-12">
              <Quote className="w-12 h-12 text-portland-red/8" />
            </div>

            {/* Content */}
            <div className="min-h-[180px] flex flex-col justify-center">
              <p
                key={current}
                className="text-xl sm:text-2xl text-portland-dark/80 leading-relaxed mb-8 animate-fade-up"
              >
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-portland-red rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-portland-dark">{t.name}</p>
                  <p className="text-portland-gray text-sm">{t.role}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-portland-mid/50">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-portland-red w-6"
                        : "bg-portland-mid hover:bg-portland-red/30"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-portland-mid hover:border-portland-red hover:bg-portland-red/5 flex items-center justify-center transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 text-portland-dark" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-portland-mid hover:border-portland-red hover:bg-portland-red/5 flex items-center justify-center transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 text-portland-dark" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
