"use client";

import { useInView } from "@/lib/useInView";
import { SPORTS, ACTIVITIES } from "@/lib/constants";
import {
  Monitor,
  Bot,
  GraduationCap,
  Users,
  Sprout,
  BookOpen,
  Rocket,
} from "lucide-react";

export default function AcademicsPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [journeyRef, journeyInView] = useInView(0.1);
  const [academicsRef, academicsInView] = useInView(0.1);
  const [sportsRef, sportsInView] = useInView(0.1);
  const [teachersRef, teachersInView] = useInView(0.1);
  const [landyRef, landyInView] = useInView(0.1);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#D10000]"
      >
        {/* Decorative accents */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/8 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`max-w-2xl text-left transition-all duration-700 ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-white/80 tracking-[0.2em] mb-4 block">
              Academics & School Life
            </span>
            <h1 className="text-display text-white mb-6">
              Learning for Today.{" "}
              <span className="text-white">
                Preparing for Tomorrow.
              </span>
            </h1>
            <p className="text-xl text-white/60">
              CAPS Curriculum | English-Medium | Grade RR–11
            </p>
          </div>
        </div>
      </section>

      {/* School Journey */}
      <section ref={journeyRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              journeyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
              The Journey
            </span>
            <h2 className="text-editorial text-portland-dark">
              Our School Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sprout,
                title: "Foundation",
                grades: "Grade RR – Grade 3",
                desc: "Building strong foundations for confident, curious and capable learners.",
              },
              {
                icon: BookOpen,
                title: "Primary",
                grades: "Grade 4 – Grade 7",
                desc: "Strengthening academic knowledge, independence, discipline and confidence.",
              },
              {
                icon: Rocket,
                title: "High School",
                grades: "Grade 8 – Grade 11",
                desc: "Preparing learners for greater academic responsibility, future opportunities and life beyond school.",
              },
            ].map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.title}
                  className={`bg-portland-light/50 rounded-2xl p-8 text-center border border-portland-mid/30 hover:bg-white hover:shadow-editorial hover:border-portland-red/10 transition-all duration-500 ${
                    journeyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-portland-red/8 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-portland-red" />
                  </div>
                  <h3 className="text-lg font-bold text-portland-dark mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-portland-red font-semibold text-sm mb-3">
                    {stage.grades}
                  </p>
                  <p className="text-portland-gray text-sm leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academics */}
      <section ref={academicsRef} className="py-24 bg-portland-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-700 ${
                academicsInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
                Academics
              </span>
              <h2 className="text-editorial text-portland-dark mb-6">
                Building Strong Academic Foundations
              </h2>
              <p className="text-lg text-portland-gray leading-relaxed mb-8">
                We are committed to building strong academic foundations
                through{" "}
                <strong className="text-portland-dark">
                  understanding, excellence and consistent support.
                </strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Computers */}
                <div className="bg-white rounded-2xl p-6 border border-portland-mid/30 shadow-editorial">
                  <div className="w-10 h-10 bg-portland-red/8 rounded-xl flex items-center justify-center mb-4">
                    <Monitor className="w-5 h-5 text-portland-red" />
                  </div>
                  <h3 className="font-bold text-portland-dark mb-2">
                    Computers
                  </h3>
                  <p className="text-portland-gray text-sm leading-relaxed">
                    Developing digital literacy and technology skills for
                    today&apos;s world.
                  </p>
                </div>

                {/* Robotics */}
                <div className="bg-white rounded-2xl p-6 border border-portland-mid/30 shadow-editorial">
                  <div className="w-10 h-10 bg-portland-red/8 rounded-xl flex items-center justify-center mb-4">
                    <Bot className="w-5 h-5 text-portland-red" />
                  </div>
                  <h3 className="font-bold text-portland-dark mb-2">
                    Robotics
                  </h3>
                  <p className="text-portland-gray text-sm leading-relaxed">
                    Encouraging innovation, creativity, problem-solving and
                    STEM thinking.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-700 delay-200 ${
                academicsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="rounded-2xl overflow-hidden shadow-editorial-lg aspect-[4/3]">
                <img
                  src="/School 2.jpeg"
                  alt="Portland learners outside the school"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports & Activities */}
      <section ref={sportsRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              sportsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
              Beyond the Classroom
            </span>
            <h2 className="text-editorial text-portland-dark">
              Sports & Activities
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div
              className={`rounded-2xl overflow-hidden shadow-editorial-lg aspect-[4/5] transition-all duration-700 ${
                sportsInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <img
                src="/Soccer.jpeg"
                alt="Portland learners playing soccer"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Activities */}
            <div
              className={`flex flex-col justify-center transition-all duration-700 delay-200 ${
                sportsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="mb-10">
                <h3 className="text-lg font-bold text-portland-dark mb-5 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-portland-red rounded-full" />
                  SPORTS
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {SPORTS.map((sport) => (
                    <div
                      key={sport.name}
                      className="flex items-center gap-3 bg-portland-light rounded-xl px-4 py-3 hover:bg-portland-red/5 transition-colors group"
                    >
                      <span className="text-lg" aria-hidden="true">{sport.icon}</span>
                      <span className="font-medium text-portland-dark text-sm group-hover:text-portland-red transition-colors">
                        {sport.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-portland-dark mb-5 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-portland-red rounded-full" />
                  ACTIVITIES
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {ACTIVITIES.map((activity) => (
                    <div
                      key={activity.name}
                      className="flex items-center gap-3 bg-portland-light rounded-xl px-4 py-3 hover:bg-portland-red/5 transition-colors group"
                    >
                      <span className="text-lg" aria-hidden="true">{activity.icon}</span>
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

      {/* Dedicated Teachers */}
      <section ref={teachersRef} className="py-24 bg-portland-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-700 ${
                teachersInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="rounded-2xl overflow-hidden shadow-editorial-lg aspect-[4/3]">
                <img
                  src="/School 3.jpeg"
                  alt="Portland teacher with learners in classroom"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div
              className={`transition-all duration-700 delay-200 ${
                teachersInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="w-12 h-12 bg-portland-red/8 rounded-xl flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-portland-red" />
              </div>
              <h2 className="text-editorial text-portland-dark mb-6">
                Dedicated Teachers
              </h2>
              <p className="text-lg text-portland-gray leading-relaxed">
                Our teachers play an important role in helping learners
                develop academically, socially and personally.
              </p>
              <p className="text-lg text-portland-gray leading-relaxed mt-4">
                We are proud of the dedicated team of educators who make Portland a place where learners thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Landy */}
      <section ref={landyRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
              landyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="text-8xl mb-6" aria-hidden="true">🦊</div>
            <h2 className="text-editorial text-portland-dark mb-2">
              Meet Landy
            </h2>
            <p className="text-eyebrow text-portland-red tracking-[0.2em] mb-4">
              The Portland Fox
            </p>
            <p className="text-lg text-portland-gray leading-relaxed mb-6">
              Clever. Curious. Confident. Playful.
            </p>
            <p className="text-lg text-portland-gray leading-relaxed">
              Landy represents the spirit of Portland and will feature in school
              activities, learner engagement and Portland&apos;s digital content.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
