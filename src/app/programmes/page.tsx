"use client";

import Link from "next/link";
import { useInView } from "@/lib/useInView";
import { SITE, SPORTS, ACTIVITIES } from "@/lib/constants";
import {
  Sprout,
  BookOpen,
  Rocket,
  Trophy,
  Palette,
  GraduationCap,
} from "lucide-react";

const STAGES = [
  {
    icon: Sprout,
    title: "Foundation Phase",
    grades: "Grade RR – Grade 3",
    desc: "Building strong foundations for confident, curious and capable learners through play-based and structured learning.",
    highlights: [
      "Phonics & Early Literacy",
      "Numeracy & Problem Solving",
      "Creative Play & Exploration",
      "Social & Emotional Development",
    ],
  },
  {
    icon: BookOpen,
    title: "Senior Primary",
    grades: "Grade 4 – Grade 7",
    desc: "Strengthening academic knowledge, independence, discipline and confidence across all CAPS subjects.",
    highlights: [
      "CAPS Curriculum Coverage",
      "English-Medium Instruction",
      "Mathematics & Science",
      "Life Skills & Technology",
    ],
  },
  {
    icon: Rocket,
    title: "High School",
    grades: "Grade 8 – Grade 11",
    desc: "Preparing learners for greater academic responsibility, future opportunities and life beyond school.",
    highlights: [
      "Subject Specialisation",
      "Exam Preparation",
      "Career Guidance",
      "Leadership Development",
    ],
  },
];

export default function ProgrammesPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [stagesRef, stagesInView] = useInView(0.1);
  const [sportsRef, sportsInView] = useInView(0.1);
  const [activitiesRef, activitiesInView] = useInView(0.1);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="hero-section relative min-h-[100vh] flex items-center overflow-hidden bg-[#D10000]"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`max-w-2xl transition-all duration-700 ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-white tracking-[0.2em] mb-4 block">
              Academic Programmes
            </span>
            <h1 className="text-display text-white mb-6">
              Programs That{" "}
              <span className="text-white">
                Inspire
              </span>
            </h1>
            <p className="text-xl text-white mb-8">
              Quality CAPS education from Grade RR through Grade 11, delivered in English with dedicated teachers and a holistic approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/admissions" className="btn-primary">
                Register Now
              </Link>
              <a href="#academic" className="btn-secondary">
                Explore Programs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programmes */}
      <section id="academic" ref={stagesRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              stagesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
              Academic Programmes
            </span>
            <h2 className="text-editorial text-portland-dark">
              Three Phases. One Vision.
            </h2>
            <p className="mt-4 text-portland-gray max-w-2xl mx-auto">
              Every stage is designed to challenge, support and prepare your child for the next step in their educational journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.title}
                  className={`group bg-portland-light/50 rounded-2xl p-8 border border-portland-mid/30 hover:bg-white hover:shadow-editorial hover:border-portland-red/10 transition-all duration-500 ${
                    stagesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-portland-red/8 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-portland-red group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7 text-portland-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-portland-dark mb-1">{stage.title}</h3>
                  <p className="text-sm font-semibold text-portland-red mb-3">{stage.grades}</p>
                  <p className="text-portland-gray text-sm mb-5 leading-relaxed">{stage.desc}</p>
                  <ul className="space-y-2">
                    {stage.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-portland-dark">
                        <span className="w-1.5 h-1.5 rounded-full bg-portland-red shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sports */}
      <section ref={sportsRef} className="py-24 bg-portland-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              sportsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
              Sports
            </span>
            <h2 className="text-editorial text-portland-dark">
              Play. Compete. Grow.
            </h2>
            <p className="mt-4 text-portland-gray max-w-xl mx-auto">
              Our sports programme builds teamwork, discipline and a healthy, active lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {SPORTS.map((sport, i) => (
              <div
                key={sport.name}
                className={`bg-white rounded-2xl p-6 text-center border border-portland-mid/30 hover:border-portland-red/20 hover:shadow-editorial transition-all duration-500 ${
                  sportsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-4xl mb-3">{sport.icon}</div>
                <p className="font-semibold text-portland-dark text-sm">{sport.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section ref={activitiesRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              activitiesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
              Extracurricular
            </span>
            <h2 className="text-editorial text-portland-dark">
              Beyond the Classroom
            </h2>
            <p className="mt-4 text-portland-gray max-w-xl mx-auto">
              Enriching activities that develop creativity, critical thinking and confidence.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {ACTIVITIES.map((act, i) => (
              <div
                key={act.name}
                className={`group bg-portland-light/50 rounded-2xl p-6 text-center border border-portland-mid/30 hover:bg-portland-red hover:border-portland-red transition-all duration-500 ${
                  activitiesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-4xl mb-3">{act.icon}</div>
                <p className="font-semibold text-portland-dark text-sm group-hover:text-white transition-colors">{act.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-portland-red">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="w-12 h-12 text-white mx-auto mb-6" />
          <h2 className="text-editorial text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Give your child the Portland advantage. Register today and receive a free school uniform with every enrolment.
          </p>
          <Link href="/admissions" className="btn-primary text-base !py-4 !px-10">
            Register Now
          </Link>
        </div>
      </section>
    </>
  );
}
