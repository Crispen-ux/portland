"use client";

import { useInView } from "@/lib/useInView";
import { SPORTS, ACTIVITIES } from "@/lib/constants";
import {
  Monitor,
  Bot,
  GraduationCap,
  Users,
  Leaf,
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
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/School 3.jpeg"
            alt="Portland learners learning"
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
              Academics & School Life
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              LEARNING FOR TODAY.{" "}
              <span className="text-gradient bg-gradient-to-r from-portland-red-light to-[#FF6B6B] bg-clip-text text-transparent">
                PREPARING FOR TOMORROW.
              </span>
            </h1>
            <p className="text-xl text-white/70">
              CAPS Curriculum | English-Medium | Grade RR–11
            </p>
          </div>
        </div>
      </section>

      {/* School Journey */}
      <section ref={journeyRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              journeyInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark mb-4">
              OUR SCHOOL JOURNEY
            </h2>
            <div className="w-20 h-1 bg-portland-red rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "FOUNDATION",
                grades: "Grade RR – Grade 3",
                desc: "Building strong foundations for confident, curious and capable learners.",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: BookOpen,
                title: "PRIMARY",
                grades: "Grade 4 – Grade 7",
                desc: "Strengthening academic knowledge, independence, discipline and confidence.",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: Rocket,
                title: "HIGH SCHOOL",
                grades: "Grade 8 – Grade 11",
                desc: "Preparing learners for greater academic responsibility, future opportunities and life beyond school.",
                color: "from-portland-red to-rose-600",
              },
            ].map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.title}
                  className={`card-premium text-center group transition-all duration-700 ${
                    journeyInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${stage.color} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-portland-dark mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-portland-red font-semibold text-sm mb-3">
                    {stage.grades}
                  </p>
                  <p className="text-portland-gray leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academics */}
      <section ref={academicsRef} className="py-20 bg-portland-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${
                academicsInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-portland-dark leading-tight mb-6">
                ACADEMICS
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
                <div className="card-premium group">
                  <div className="w-12 h-12 bg-portland-red/8 rounded-xl flex items-center justify-center mb-4 group-hover:bg-portland-red group-hover:scale-110 transition-all duration-300">
                    <Monitor className="w-6 h-6 text-portland-red group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-portland-dark mb-2">
                    COMPUTERS
                  </h3>
                  <p className="text-portland-gray text-sm leading-relaxed">
                    Developing digital literacy and technology skills for
                    today&apos;s world.
                  </p>
                </div>

                {/* Robotics */}
                <div className="card-premium group">
                  <div className="w-12 h-12 bg-portland-red/8 rounded-xl flex items-center justify-center mb-4 group-hover:bg-portland-red group-hover:scale-110 transition-all duration-300">
                    <Bot className="w-6 h-6 text-portland-red group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-portland-dark mb-2">
                    ROBOTICS
                  </h3>
                  <p className="text-portland-gray text-sm leading-relaxed">
                    Encouraging innovation, creativity, problem-solving and
                    STEM thinking.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-200 ${
                academicsInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="rounded-3xl overflow-hidden shadow-premium-lg aspect-[4/3]">
                <img
                  src="/School 2.jpeg"
                  alt="Portland learners in computer lab"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports & Activities */}
      <section ref={sportsRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              sportsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark mb-4">
              SPORTS & ACTIVITIES
            </h2>
            <div className="w-20 h-1 bg-portland-red rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div
              className={`rounded-3xl overflow-hidden shadow-premium-lg aspect-[4/5] transition-all duration-1000 ${
                sportsInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <img
                src="/Soccer.jpeg"
                alt="Portland learners playing sports"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Activities */}
            <div
              className={`flex flex-col justify-center transition-all duration-1000 delay-200 ${
                sportsInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
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
                      <span className="text-xl">{sport.icon}</span>
                      <span className="font-medium text-portland-dark text-sm group-hover:text-portland-red transition-colors">
                        {sport.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

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
                      <span className="text-xl">{activity.icon}</span>
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
      <section ref={teachersRef} className="py-20 bg-portland-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${
                teachersInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="rounded-3xl overflow-hidden shadow-premium-lg aspect-[4/3]">
                <img
                  src="/School 3.jpeg"
                  alt="Portland teacher with learners"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-200 ${
                teachersInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="w-14 h-14 bg-portland-red/8 rounded-2xl flex items-center justify-center mb-5">
                <Users className="w-7 h-7 text-portland-red" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-portland-dark leading-tight mb-6">
                DEDICATED TEACHERS
              </h2>
              <p className="text-lg text-portland-gray leading-relaxed">
                Our teachers play an important role in helping learners
                develop academically, socially and personally.
              </p>
              <p className="text-lg text-portland-gray leading-relaxed mt-4">
                Use real photographs of Portland teachers wherever possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Landy */}
      <section ref={landyRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${
              landyInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="text-8xl mb-6">🦊</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-portland-dark mb-4">
              MEET LANDY <span className="text-portland-red">🦊</span>
            </h2>
            <p className="text-portland-red font-semibold text-lg mb-4">
              THE PORTLAND FOX
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
