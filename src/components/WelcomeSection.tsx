"use client";

import { useInView } from "@/lib/useInView";

export default function WelcomeSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
              Welcome to Portland
            </span>
            <h2 className="text-editorial text-portland-dark mb-6">
              A place to learn.{" "}
              <span className="text-gradient">A place to grow.</span>
            </h2>
            <p className="text-lg text-portland-gray leading-relaxed mb-6">
              Portland Group of Schools is a combined school in Johannesburg,
              offering education from Grade RR to Grade 11.
            </p>
            <p className="text-lg text-portland-gray leading-relaxed mb-8">
              We provide a supportive, structured and engaging environment
              where learners are encouraged to{" "}
              <strong className="text-portland-dark">learn, grow, build confidence</strong> and
              prepare for the future.
            </p>
            <div className="flex flex-wrap gap-3">
              {["CAPS Curriculum", "English-Medium", "Grade RR–11"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-portland-cream text-portland-dark text-sm font-medium rounded-full border border-portland-mid/50"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Image grid — editorial asymmetric layout */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-editorial aspect-[3/4]">
                <img
                  src="/School 2.jpeg"
                  alt="Portland learners outside the school"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-editorial aspect-square">
                <img
                  src="/School 3.jpeg"
                  alt="Portland teacher with learner in classroom"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="rounded-2xl overflow-hidden shadow-editorial aspect-square">
                <img
                  src="/Soccer.jpeg"
                  alt="Portland learners playing soccer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-editorial aspect-[3/4]">
                <img
                  src="/School 1.jpeg"
                  alt="Portland group of learners at school entrance"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
