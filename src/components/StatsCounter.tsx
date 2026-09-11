"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "@/lib/useInView";
import { Users, BookOpen, Trophy, Calendar } from "lucide-react";

const STATS = [
  { icon: Users, value: 500, suffix: "+", label: "Learners Enrolled", color: "text-portland-red" },
  { icon: BookOpen, value: 13, suffix: "", label: "Grade Levels (RR–11)", color: "text-portland-red" },
  { icon: Trophy, value: 15, suffix: "+", label: "Years of Excellence", color: "text-portland-red" },
  { icon: Calendar, value: 10, suffix: "+", label: "Sports & Activities", color: "text-portland-red" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const [sectionRef, inView] = useInView(0.1);

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-portland-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-portland-red/10 via-transparent to-portland-red/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-14 h-14 bg-portland-red/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-portland-red" />
                </div>
                <p className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/50 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
