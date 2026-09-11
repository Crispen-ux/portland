"use client";

import { useInView } from "@/lib/useInView";
import { SITE } from "@/lib/constants";

export default function TrustStrip() {
  const [ref, inView] = useInView(0.15);

  const items = [
    { label: "Admissions Open", value: SITE.grades },
    { label: "Curriculum", value: "CAPS · English-Medium" },
    { label: "Location", value: `${SITE.address}, ${SITE.city}` },
    { label: "Monthly Fees From", value: `${SITE.fees.gradeRRto7}/month` },
  ];

  return (
    <section ref={ref} className="relative py-6 border-y border-portland-mid/50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-portland-mid/50 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {items.map((item, i) => (
            <div
              key={item.label}
              className="text-center lg:px-6"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-[10px] sm:text-xs text-portland-gray uppercase tracking-widest font-medium mb-1">
                {item.label}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-portland-dark">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
