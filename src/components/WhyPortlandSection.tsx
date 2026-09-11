"use client";

import { useInView } from "@/lib/useInView";
import { Monitor, Bot, GraduationCap, Trophy } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Computers",
    description: "Building digital skills for today's world.",
    image: "/School 3.jpeg",
  },
  {
    icon: Bot,
    title: "Robotics",
    description: "Encouraging creativity, innovation and problem-solving.",
    image: "/Soccer.jpeg",
  },
  {
    icon: GraduationCap,
    title: "Dedicated Teachers",
    description: "Teachers committed to the growth and success of every learner.",
    image: "/School 2.jpeg",
  },
  {
    icon: Trophy,
    title: "Sports & Activities",
    description: "Helping learners discover their talents, build confidence and work as a team.",
    image: "/Soccer.jpeg",
  },
];

export default function WhyPortlandSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden bg-portland-dark"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-eyebrow text-portland-red-light tracking-[0.2em] mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-editorial text-white mb-4">
            Why Portland?
          </h2>
        </div>

        {/* Feature cards — editorial image overlay style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative rounded-2xl overflow-hidden h-80 cursor-default transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Image */}
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-portland-dark via-portland-dark/60 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="w-10 h-10 bg-portland-red/90 rounded-xl flex items-center justify-center mb-3 group-hover:bg-portland-red transition-colors duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
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
