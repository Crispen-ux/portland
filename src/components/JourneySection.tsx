"use client";

import { useInView } from "@/lib/useInView";
import { Sprout, BookOpen, GraduationCap } from "lucide-react";

const stages = [
  {
    icon: Sprout,
    title: "Foundation",
    grades: "Grade RR – Grade 3",
    description: "Building strong foundations for confident, curious and capable learners.",
  },
  {
    icon: BookOpen,
    title: "Primary",
    grades: "Grade 4 – Grade 7",
    description: "Strengthening academic knowledge, independence, discipline and confidence.",
  },
  {
    icon: GraduationCap,
    title: "High School",
    grades: "Grade 8 – Grade 11",
    description: "Preparing learners for greater academic responsibility, future opportunities and life beyond school.",
  },
];

export default function JourneySection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
            The Journey
          </span>
          <h2 className="text-editorial text-portland-dark">
            One School.{" "}
            <span className="text-gradient">One Journey.</span>
          </h2>
        </div>

        {/* Journey timeline — premium editorial with icons */}
        <div
          className={`relative max-w-5xl mx-auto transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Connected line */}
          <div className="hidden md:block absolute top-[40px] left-0 right-0 h-[1px] bg-portland-mid/60" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div key={stage.title} className="relative text-center group">
                  {/* Icon circle */}
                  <div className="relative z-10 mx-auto w-20 h-20 bg-portland-cream rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-editorial group-hover:bg-portland-red transition-colors duration-300">
                    <Icon className="w-8 h-8 text-portland-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-portland-dark mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-portland-red font-semibold text-sm mb-3">
                    {stage.grades}
                  </p>
                  <p className="text-portland-gray text-sm leading-relaxed max-w-xs mx-auto">
                    {stage.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          <div className="hidden md:flex absolute top-[40px] left-0 right-0 -translate-y-1/2 justify-between px-[22%] pointer-events-none">
            <span className="text-portland-mid text-lg">→</span>
            <span className="text-portland-mid text-lg">→</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl sm:text-2xl font-bold text-portland-dark">
            <span className="text-gradient">Learn. Grow. Belong. Achieve.</span>
          </p>
          <p className="text-portland-gray mt-3 text-lg">
            Grow with us from the early years through high school.
          </p>
        </div>
      </div>
    </section>
  );
}
