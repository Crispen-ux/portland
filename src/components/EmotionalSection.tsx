"use client";

import { useInView } from "@/lib/useInView";

export default function EmotionalSection() {
  const [ref, inView] = useInView(0.15);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden bg-portland-cream"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-portland-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-portland-red/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-premium-lg aspect-[4/5]">
              <img
                src="/School 3.jpeg"
                alt="Portland learner smiling confidently"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-portland-dark/30 via-transparent to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-card-hover max-w-[220px]">
              <p className="text-4xl mb-2" aria-hidden="true">🌟</p>
              <p className="text-portland-dark font-bold text-sm">
                Every child has potential
              </p>
              <p className="text-portland-gray text-xs mt-1">
                We help them discover it
              </p>
            </div>
          </div>

          {/* Text */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark leading-tight mb-6">
              YOUR CHILD{" "}
              <span className="text-gradient">DESERVES TO BE SEEN.</span>
            </h2>
            <p className="text-lg text-portland-gray leading-relaxed mb-6">
              At Portland, we believe every child has potential.
            </p>
            <p className="text-lg text-portland-gray leading-relaxed mb-6">
              We don&apos;t only focus on what a learner knows. We care about{" "}
              <strong className="text-portland-dark">
                who they are becoming
              </strong>
              .
            </p>
            <p className="text-lg text-portland-gray leading-relaxed mb-8">
              We want every learner to feel supported, challenged, respected
              and encouraged to reach their potential.
            </p>

            {/* Values preview */}
            <div className="grid grid-cols-2 gap-3">
              {["Supported", "Challenged", "Respected", "Encouraged"].map(
                (word) => (
                  <div
                    key={word}
                    className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-card"
                  >
                    <span className="w-2 h-2 bg-portland-red rounded-full shrink-0" />
                    <span className="text-portland-dark font-semibold text-sm">
                      {word}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
