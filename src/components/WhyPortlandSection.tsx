"use client";

import { useInView } from "@/lib/useInView";
import { Monitor, Bot, GraduationCap, Trophy } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "COMPUTERS",
    description: "Building digital skills for today's world.",
    image:
      "/School 3.jpeg",
  },
  {
    icon: Bot,
    title: "ROBOTICS",
    description:
      "Encouraging creativity, innovation and problem-solving.",
    image:
      "/Soccer.jpeg",
  },
  {
    icon: GraduationCap,
    title: "DEDICATED TEACHERS",
    description:
      "Teachers committed to the growth and success of every learner.",
    image:
      "/School 2.jpeg",
  },
  {
    icon: Trophy,
    title: "SPORTS & ACTIVITIES",
    description:
      "Helping learners discover their talents, build confidence and work as a team.",
    image:
      "/Soccer.jpeg",
  },
];

export default function WhyPortlandSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden bg-portland-dark"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-portland-red/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-portland-red/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-portland-red font-semibold text-sm uppercase tracking-widest mb-4">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            WHY PORTLAND?
          </h2>
          <div className="w-20 h-1 bg-portland-red rounded-full mx-auto" />
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative rounded-2xl overflow-hidden h-80 cursor-default transition-all duration-700 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Image */}
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-portland-dark via-portland-dark/60 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="w-12 h-12 bg-portland-red/90 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
