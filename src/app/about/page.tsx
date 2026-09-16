"use client";

import { useInView } from "@/lib/useInView";
import Link from "next/link";
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
        className="hero-section relative min-h-[100vh] flex items-center overflow-hidden bg-[#D10000]"
      >
        {/* Decorative accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`max-w-2xl text-left transition-all duration-700 ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-white/80 tracking-[0.2em] mb-4 block">
              About Us
            </span>
            <h1 className="text-display text-white mb-6">
              About{" "}
              <span className="text-white">Portland</span>
            </h1>
            <p className="text-xl text-white/70">
              A place to learn. A place to grow. A place to belong.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/admissions" className="btn-primary">
                Register Now
              </Link>
              <a href="#values" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About content */}
      <section ref={contentRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-700 ${
                contentInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
                Who We Are
              </span>
              <h2 className="text-editorial text-portland-dark mb-6">
                A place to learn. A place to grow.{" "}
                <span className="text-gradient">A place to belong.</span>
              </h2>
              <p className="text-lg text-portland-gray leading-relaxed mb-6">
                Portland Group of Schools is a combined school in Johannesburg
                offering education from{" "}
                <strong className="text-portland-dark">Grade RR to Grade 11</strong>.
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
              className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
                contentInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-editorial aspect-[3/4]">
                  <img
                    src="/School 2.jpeg"
                    alt="Portland learners outside the school"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-editorial aspect-square">
                  <img
                    src="/School 3.jpeg"
                    alt="Portland teacher with learner in classroom"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden shadow-editorial aspect-square">
                  <img
                    src="/Soccer.jpeg"
                    alt="Portland learners playing soccer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-editorial aspect-[3/4]">
                  <img
                    src="/School 1.jpeg"
                    alt="Portland group of learners at school entrance"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-portland-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 border border-portland-mid/30 shadow-editorial">
              <div className="w-12 h-12 bg-portland-red/8 rounded-xl flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-portland-red" />
              </div>
              <h3 className="text-xl font-bold text-portland-dark mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-portland-gray leading-relaxed">
                To nurture confident, capable and responsible young people who
                are prepared to create meaningful futures.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 border border-portland-mid/30 shadow-editorial">
              <div className="w-12 h-12 bg-portland-red/8 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-portland-red" />
              </div>
              <h3 className="text-xl font-bold text-portland-dark mb-4">
                Our Mission
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
      <section ref={valuesRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
              Our Values
            </span>
            <h2 className="text-editorial text-portland-dark">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div
                  key={value.name}
                  className={`group p-6 bg-portland-light/50 rounded-2xl border border-portland-mid/30 hover:border-portland-red/20 hover:bg-white hover:shadow-editorial transition-all duration-500 ${
                    valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-10 h-10 bg-portland-red/8 rounded-xl flex items-center justify-center mb-4 group-hover:bg-portland-red transition-colors duration-300">
                    <Icon className="w-5 h-5 text-portland-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-portland-dark mb-2">
                    {value.name}
                  </h3>
                  <p className="text-portland-gray text-sm leading-relaxed">
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
        className="py-24 bg-portland-dark relative overflow-hidden"
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-700 ${
              beliefInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <span className="text-eyebrow text-portland-red-light tracking-[0.2em] mb-4 block">
              Our Belief
            </span>
            <div className="mb-8">
              <span className="text-6xl text-portland-red/15 font-serif">&ldquo;</span>
            </div>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-white italic leading-relaxed mb-8">
              True education nurtures character as much as competence.
            </blockquote>
            <p className="text-white/50 text-lg">
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
