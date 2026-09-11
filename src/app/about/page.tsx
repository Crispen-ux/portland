"use client";

import { useInView } from "@/lib/useInView";
import { VALUES } from "@/lib/constants";
import {
  Eye,
  Target,
  Heart,
  BookOpen,
  Users,
  Star,
  Shield,
  Handshake,
} from "lucide-react";

const VALUE_ICONS = [Heart, Star, Target, Shield, Handshake, BookOpen];

export default function AboutPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [contentRef, contentInView] = useInView(0.1);
  const [valuesRef, valuesInView] = useInView(0.1);
  const [beliefRef, beliefInView] = useInView(0.1);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=85&auto=format&fit=crop"
            alt="Portland Group of Schools"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-portland-dark/90 via-portland-dark/70 to-portland-dark/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-2xl transition-all duration-1000 ${
              heroInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-portland-red font-semibold text-sm uppercase tracking-widest mb-4">
              About Us
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              ABOUT{" "}
              <span className="text-gradient bg-gradient-to-r from-portland-red-light to-[#FF6B6B] bg-clip-text text-transparent">
                PORTLAND
              </span>
            </h1>
            <p className="text-xl text-white/70">
              A place to learn. A place to grow. A place to belong.
            </p>
          </div>
        </div>
      </section>

      {/* About content */}
      <section ref={contentRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${
                contentInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <p className="text-portland-red font-semibold text-sm uppercase tracking-widest mb-4">
                Who We Are
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-portland-dark leading-tight mb-6">
                A PLACE TO LEARN. A PLACE TO GROW.{" "}
                <span className="text-gradient">A PLACE TO BELONG.</span>
              </h2>
              <p className="text-lg text-portland-gray leading-relaxed mb-6">
                Portland Group of Schools is a combined school in Johannesburg
                offering education from{" "}
                <strong className="text-portland-dark">
                  Grade RR to Grade 11
                </strong>
                .
              </p>
              <p className="text-lg text-portland-gray leading-relaxed mb-6">
                We are committed to creating a structured, supportive and
                engaging environment where learners can develop academically,
                socially and personally.
              </p>
              <p className="text-lg text-portland-gray leading-relaxed">
                We believe that education is about more than marks. It is about
                developing{" "}
                <strong className="text-portland-dark">
                  knowledge, character, confidence, discipline and the skills
                  needed for life beyond school.
                </strong>
              </p>
            </div>

            <div
              className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-200 ${
                contentInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-card aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&auto=format&fit=crop"
                    alt="Portland learner studying"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-card aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80&auto=format&fit=crop"
                    alt="Portland classroom"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden shadow-card aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=600&q=80&auto=format&fit=crop"
                    alt="Portland learners"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-card aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80&auto=format&fit=crop"
                    alt="Portland teacher"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-portland-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="card-premium">
              <div className="w-14 h-14 bg-portland-red/8 rounded-2xl flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-portland-red" />
              </div>
              <h3 className="text-2xl font-bold text-portland-dark mb-4">
                OUR VISION
              </h3>
              <p className="text-lg text-portland-gray leading-relaxed">
                To nurture confident, capable and responsible young people who
                are prepared to create meaningful futures.
              </p>
            </div>

            {/* Mission */}
            <div className="card-premium">
              <div className="w-14 h-14 bg-portland-red/8 rounded-2xl flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-portland-red" />
              </div>
              <h3 className="text-2xl font-bold text-portland-dark mb-4">
                OUR MISSION
              </h3>
              <p className="text-lg text-portland-gray leading-relaxed">
                To provide quality, accessible education in a safe, structured
                and supportive environment where every learner is encouraged to
                reach their potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              valuesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-portland-red font-semibold text-sm uppercase tracking-widest mb-4">
              Our Values
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark">
              WHAT WE STAND FOR
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div
                  key={value.name}
                  className={`card-premium group transition-all duration-700 ${
                    valuesInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-portland-red/8 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-portland-red group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-portland-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-portland-dark mb-2 uppercase">
                    {value.name}
                  </h3>
                  <p className="text-portland-gray leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Belief */}
      <section
        ref={beliefRef}
        className="py-20 bg-portland-dark relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-portland-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-portland-red/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              beliefInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <p className="text-portland-red font-semibold text-sm uppercase tracking-widest mb-4">
              Our Belief
            </p>
            <div className="mb-8">
              <span className="text-6xl text-portland-red/20 font-serif">&ldquo;</span>
            </div>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-white italic leading-relaxed mb-8">
              True education nurtures character as much as competence.
            </blockquote>
            <p className="text-white/60 text-lg">
              We believe learners thrive when{" "}
              <strong className="text-white">
                schools, parents and learners work together.
              </strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
