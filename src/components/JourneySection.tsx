"use client";

import { useInView } from "@/lib/useInView";

export default function JourneySection() {
  const [ref, inView] = useInView(0.15);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark mb-4">
            ONE SCHOOL. <span className="text-gradient">ONE JOURNEY.</span>
          </h2>
          <div className="w-20 h-1 bg-portland-red rounded-full mx-auto" />
        </div>

        {/* Journey timeline */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Connected line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-portland-red/15 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Foundation */}
            <div className="relative text-center group">
              <div className="relative z-10 mx-auto w-20 h-20 bg-portland-cream rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-card group-hover:scale-110 group-hover:bg-portland-red transition-all duration-300">
                <span className="text-3xl group-hover:text-white transition-colors" aria-hidden="true">
                  🌱
                </span>
              </div>
              <h3 className="text-xl font-bold text-portland-dark mb-2">
                FOUNDATION
              </h3>
              <p className="text-portland-red font-semibold text-sm mb-3">
                Grade RR – Grade 3
              </p>
              <p className="text-portland-gray text-sm leading-relaxed">
                Building strong foundations for confident, curious and capable
                learners.
              </p>
            </div>

            {/* Primary */}
            <div className="relative text-center group">
              <div className="relative z-10 mx-auto w-20 h-20 bg-portland-cream rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-card group-hover:scale-110 group-hover:bg-portland-red transition-all duration-300">
                <span className="text-3xl group-hover:text-white transition-colors" aria-hidden="true">
                  📚
                </span>
              </div>
              <h3 className="text-xl font-bold text-portland-dark mb-2">
                PRIMARY
              </h3>
              <p className="text-portland-red font-semibold text-sm mb-3">
                Grade 4 – Grade 7
              </p>
              <p className="text-portland-gray text-sm leading-relaxed">
                Strengthening academic knowledge, independence, discipline and
                confidence.
              </p>
            </div>

            {/* High School */}
            <div className="relative text-center group">
              <div className="relative z-10 mx-auto w-20 h-20 bg-portland-cream rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-card group-hover:scale-110 group-hover:bg-portland-red transition-all duration-300">
                <span className="text-3xl group-hover:text-white transition-colors" aria-hidden="true">
                  🎓
                </span>
              </div>
              <h3 className="text-xl font-bold text-portland-dark mb-2">
                HIGH SCHOOL
              </h3>
              <p className="text-portland-red font-semibold text-sm mb-3">
                Grade 8 – Grade 11
              </p>
              <p className="text-portland-gray text-sm leading-relaxed">
                Preparing learners for greater academic responsibility, future
                opportunities and life beyond school.
              </p>
            </div>
          </div>

          {/* Arrows between */}
          <div className="hidden md:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 justify-between px-[22%] pointer-events-none">
            <span className="text-portland-red/30 text-2xl">→</span>
            <span className="text-portland-red/30 text-2xl">→</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-2xl sm:text-3xl font-bold text-portland-dark">
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
