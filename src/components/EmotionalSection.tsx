"use client";

import { useInView } from "@/lib/useInView";

export default function EmotionalSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden bg-portland-cream"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-editorial-lg aspect-[4/5]">
              <img
                src="/School 3.jpeg"
                alt="Portland learner smiling confidently"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-portland-dark/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* Text — large editorial typography */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <h2 className="text-editorial text-portland-dark mb-8">
              Your child{" "}
              <span className="text-gradient">deserves to be seen.</span>
            </h2>
            <div className="space-y-4 mb-10">
              <p className="text-lg text-portland-gray leading-relaxed">
                At Portland, we believe every child has potential.
              </p>
              <p className="text-lg text-portland-gray leading-relaxed">
                We don&apos;t only focus on what a learner knows. We care about{" "}
                <strong className="text-portland-dark">who they are becoming</strong>.
              </p>
              <p className="text-lg text-portland-gray leading-relaxed">
                Every learner should feel supported, challenged, respected
                and encouraged to reach their potential.
              </p>
            </div>

            {/* Values preview */}
            <div className="grid grid-cols-2 gap-3">
              {["Supported", "Challenged", "Respected", "Encouraged"].map(
                (word) => (
                  <div
                    key={word}
                    className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-editorial"
                  >
                    <span className="w-1.5 h-1.5 bg-portland-red rounded-full shrink-0" />
                    <span className="text-portland-dark font-medium text-sm">
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
