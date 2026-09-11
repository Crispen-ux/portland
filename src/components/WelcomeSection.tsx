"use client";

import { useInView } from "@/lib/useInView";
import { SITE } from "@/lib/constants";

export default function WelcomeSection() {
  const [ref, inView] = useInView(0.15);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-portland-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-portland-cream rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div
            className={`transition-all duration-1000 ${
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <p className="text-portland-red font-semibold text-sm uppercase tracking-widest mb-4">
              Welcome to Portland
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark leading-tight mb-6">
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
                    className="px-4 py-2 bg-portland-cream text-portland-red text-sm font-semibold rounded-full border border-portland-red/10"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Image grid */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-200 ${
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-card aspect-[3/4]">
                <img
                  src="/School 2.jpeg"
                  alt="Portland learner studying"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-card aspect-square">
                <img
                  src="/School 3.jpeg"
                  alt="Portland classroom"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="rounded-2xl overflow-hidden shadow-card aspect-square">
                <img
                  src="/Soccer.jpeg"
                  alt="Portland learners playing"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-card aspect-[3/4]">
                <img
                  src="/School 1.jpeg"
                  alt="Portland teacher with learners"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
