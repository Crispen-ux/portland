"use client";

import { useInView } from "@/lib/useInView";
import { Shirt, Bus } from "lucide-react";

export default function ValueSection() {
  const [ref, inView] = useInView(0.15);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-red-subtle" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark mb-4">
            MORE VALUE FOR YOUR FAMILY
          </h2>
          <div className="w-20 h-1 bg-portland-red rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Uniform */}
          <div
            className={`card-premium text-center group transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="w-20 h-20 bg-portland-red/8 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-portland-red group-hover:scale-110 transition-all duration-300">
              <Shirt className="w-10 h-10 text-portland-red group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-portland-dark mb-3">
              FREE SCHOOL UNIFORM
            </h3>
            <p className="text-portland-gray leading-relaxed">
              Your child&apos;s school uniform is provided <strong className="text-portland-dark">FREE</strong>.
            </p>
          </div>

          {/* Transport */}
          <div
            className={`card-premium text-center group transition-all duration-700 delay-150 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="w-20 h-20 bg-portland-red/8 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-portland-red group-hover:scale-110 transition-all duration-300">
              <Bus className="w-10 h-10 text-portland-red group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-portland-dark mb-3">
              SCHOOL TRANSPORT AVAILABLE
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
