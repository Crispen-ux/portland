"use client";

import { useInView } from "@/lib/useInView";
import { SPORTS, ACTIVITIES } from "@/lib/constants";

export default function SportsSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-portland-red/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-portland-red font-semibold text-sm uppercase tracking-widest mb-4">
            Beyond the Classroom
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark mb-4">
            MORE THAN THE CLASSROOM
          </h2>
          <p className="text-portland-gray text-lg max-w-2xl mx-auto">
            Give learners opportunities to explore their interests, discover
            their talents and develop confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="rounded-3xl overflow-hidden shadow-premium-lg aspect-[4/5]">
              <img
                src="/Soccer.jpeg"
                alt="Portland learners playing sports"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Activities */}
          <div
            className={`flex flex-col justify-center transition-all duration-1000 delay-200 ${
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            {/* Sports */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-portland-dark mb-5 flex items-center gap-2">
                <span className="w-8 h-1 bg-portland-red rounded-full" />
                SPORTS
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SPORTS.map((sport) => (
                  <div
                    key={sport.name}
                    className="flex items-center gap-3 bg-portland-light rounded-xl px-4 py-3 hover:bg-portland-red/5 transition-colors group"
                  >
                    <span className="text-xl" aria-hidden="true">{sport.icon}</span>
                    <span className="font-medium text-portland-dark text-sm group-hover:text-portland-red transition-colors">
                      {sport.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h3 className="text-xl font-bold text-portland-dark mb-5 flex items-center gap-2">
                <span className="w-8 h-1 bg-portland-red rounded-full" />
                ACTIVITIES
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {ACTIVITIES.map((activity) => (
                  <div
                    key={activity.name}
                    className="flex items-center gap-3 bg-portland-light rounded-xl px-4 py-3 hover:bg-portland-red/5 transition-colors group"
                  >
                    <span className="text-xl" aria-hidden="true">{activity.icon}</span>
                    <span className="font-medium text-portland-dark text-sm group-hover:text-portland-red transition-colors">
                      {activity.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
