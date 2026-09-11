"use client";

import { useInView } from "@/lib/useInView";
import { Shirt, Bus } from "lucide-react";

export default function ValueSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden bg-portland-cream">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
            For Your Family
          </span>
          <h2 className="text-editorial text-portland-dark">
            More Value for Your Family
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Uniform */}
          <div
            className={`bg-white rounded-2xl p-8 text-center border border-portland-mid/30 shadow-editorial transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="w-16 h-16 bg-portland-red/8 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shirt className="w-8 h-8 text-portland-red" />
            </div>
            <h3 className="text-xl font-bold text-portland-dark mb-3">
              Free School Uniform
            </h3>
            <p className="text-portland-gray leading-relaxed">
              Your child&apos;s school uniform is provided <strong className="text-portland-dark">FREE</strong>.
            </p>
          </div>

          {/* Transport */}
          <div
            className={`bg-white rounded-2xl p-8 text-center border border-portland-mid/30 shadow-editorial transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="w-16 h-16 bg-portland-red/8 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bus className="w-8 h-8 text-portland-red" />
            </div>
            <h3 className="text-xl font-bold text-portland-dark mb-3">
              School Transport Available
            </h3>
            <p className="text-portland-gray leading-relaxed">
              Convenient school transport options are available for families who
              need them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
