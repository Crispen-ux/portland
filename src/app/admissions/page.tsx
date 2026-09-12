"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useInView } from "@/lib/useInView";
import { SITE } from "@/lib/constants";
import Link from "next/link";
import AdmissionsForm from "@/components/AdmissionsForm";
import {
  Search,
  MessageSquare,
  Phone,
  Users,
  BookOpen,
  ChevronRight,
  MapPin,
  Eye,
  FileText,
  PartyPopper,
  Shirt,
} from "lucide-react";

const processSteps = [
  {
    icon: Search,
    title: "Enquire",
    desc: "Tell us about your child and your family's needs.",
  },
  {
    icon: MessageSquare,
    title: "Speak With Our Team",
    desc: "Our admissions team helps you with the next steps.",
  },
  {
    icon: Eye,
    title: "Visit Portland",
    desc: "Arrange a school visit to meet our team and see our classrooms.",
  },
  {
    icon: FileText,
    title: "Apply",
    desc: "Complete the required application process and submit documents.",
  },
  {
    icon: PartyPopper,
    title: "Join Portland",
    desc: "Welcome to the Portland family. Your child's journey begins.",
  },
];

const grades = [
  { phase: "Early Years", range: "Grade RR – Grade R", fee: "R800/month" },
  { phase: "Primary Phase", range: "Grade 1 – Grade 7", fee: "R800/month" },
  { phase: "High School", range: "Grade 8 – Grade 11", fee: "R900/month" },
];

function AdmissionsContent() {
  const searchParams = useSearchParams();
  const preselectedGrade = searchParams.get("grade") || undefined;
  const source = searchParams.get("source") || undefined;

  const [heroRef, heroInView] = useInView(0.1);
  const [gradesRef, gradesInView] = useInView(0.15);
  const [feesRef, feesInView] = useInView(0.15);
  const [processRef, processInView] = useInView(0.1);
  const [formRef, formInView] = useInView(0.1);
  const [contactRef, contactInView] = useInView(0.15);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center overflow-hidden bg-portland-cream"
      >
        {/* Decorative accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-portland-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-portland-red/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`max-w-2xl transition-all duration-700 ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
              Admissions Open
            </span>
            <h1 className="text-display text-portland-dark mb-6">
              Start Your Child&apos;s Journey at{" "}
              <span className="text-gradient">Portland</span>
            </h1>
            <p className="text-xl text-portland-gray mb-8">
              Interested in joining Portland Schools? Tell us a little about your
              child and our team will help you with the next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#enquiry-form"
                className="btn-primary"
              >
                Start an Enquiry
              </a>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Portland */}
      <section className="py-20 bg-portland-light">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-portland-dark mb-4">
              Why Portland Schools?
            </h2>
            <p className="text-portland-gray max-w-xl mx-auto">
              We believe every child deserves to be known, valued, and supported.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Where Every Child Is Known",
                desc: "Small class sizes. Personal attention. Your child is never just a number.",
              },
              {
                icon: BookOpen,
                title: "CAPS Curriculum",
                desc: "English-medium education from Grade RR to Grade 11, following the national CAPS curriculum.",
              },
              {
                icon: Shirt,
                title: "Free School Uniform",
                desc: "Every learner receives their full school uniform at no additional cost.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-portland-mid/30"
              >
                <div className="w-10 h-10 bg-portland-red/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-portland-red" />
                </div>
                <h3 className="font-bold text-portland-dark mb-2">{item.title}</h3>
                <p className="text-sm text-portland-gray leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grades */}
      <section ref={gradesRef} className="py-20 bg-white">
        <div
          className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${
            gradesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-portland-dark text-center mb-4">
            Grades Offered
          </h2>
          <p className="text-center text-portland-gray max-w-xl mx-auto mb-12">
            Quality CAPS education from Grade RR through Grade 11.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {grades.map((g, i) => (
              <div
                key={g.phase}
                className={`bg-portland-light rounded-2xl p-6 text-center transition-all duration-700 ${
                  gradesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-xs font-medium text-portland-red uppercase tracking-wider mb-2">
                  {g.phase}
                </p>
                <p className="text-lg font-bold text-portland-dark mb-1">{g.range}</p>
                <p className="text-sm text-portland-gray">{g.fee}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees Summary */}
      <section ref={feesRef} className="py-20 bg-portland-light">
        <div
          className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${
            feesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-portland-dark text-center mb-4">
            Fees at a Glance
          </h2>
          <p className="text-center text-portland-gray max-w-xl mx-auto mb-12">
            Transparent, affordable pricing with no hidden costs.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-8 text-center border border-portland-mid/30 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
              <p className="text-xs font-medium text-portland-gray uppercase tracking-wider mb-2">
                Grade RR – Grade 7
              </p>
              <p className="text-4xl font-bold text-portland-dark">
                {SITE.fees.gradeRRto7}<span className="text-base font-normal text-portland-gray">/month</span>
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center border border-portland-mid/30 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
              <p className="text-xs font-medium text-portland-gray uppercase tracking-wider mb-2">
                Grade 8 – Grade 11
              </p>
              <p className="text-4xl font-bold text-portland-dark">
                {SITE.fees.grade8to11}<span className="text-base font-normal text-portland-gray">/month</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white rounded-xl px-5 py-2.5 border border-portland-mid/30 text-sm">
              <span className="text-portland-gray">Registration: </span>
              <span className="font-semibold text-portland-dark">{SITE.fees.registration} once-off</span>
            </div>
            <div className="bg-white rounded-xl px-5 py-2.5 border border-portland-mid/30 text-sm">
              <span className="text-portland-gray">Sports Levy: </span>
              <span className="font-semibold text-portland-dark">{SITE.fees.sportsLevy}/year</span>
            </div>
            <div className="bg-white rounded-xl px-5 py-2.5 border border-portland-mid/30 text-sm">
              <span className="text-portland-gray">Uniform: </span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/school-fees"
              className="inline-flex items-center gap-2 text-portland-red hover:text-portland-red-dark font-medium text-sm transition-colors"
            >
              View Full Fees
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-portland-dark mb-4">
              How Admissions Works
            </h2>
            <p className="text-portland-gray max-w-xl mx-auto">
              A simple, straightforward process to welcome your child to Portland.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className={`text-center transition-all duration-700 ${
                  processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative inline-block mb-4">
                  <div className="w-12 h-12 bg-portland-red rounded-xl flex items-center justify-center mx-auto">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-portland-dark text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-portland-dark text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-portland-gray leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" ref={formRef} className="py-20 bg-portland-light scroll-mt-20">
        <div
          className={`mx-auto max-w-2xl px-6 transition-all duration-700 ${
            formInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-portland-dark mb-4">
              Start Your Enquiry
            </h2>
            <p className="text-portland-gray max-w-lg mx-auto">
              Tell us about your child and we&apos;ll get back to you with the next
              steps.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-portland-mid/30">
            <AdmissionsForm
              preselectedGrade={preselectedGrade}
              source={source}
            />
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section ref={contactRef} className="py-20 bg-portland-dark text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Prefer to Talk Directly?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Our admissions team is ready to answer your questions.
            </p>
          </div>
          <div
            className={`grid sm:grid-cols-3 gap-6 transition-all duration-700 ${
              contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 text-center transition-all group"
            >
              <div className="w-12 h-12 bg-[#25D366]/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366]/30 transition-colors">
                <MessageSquare className="w-5 h-5 text-[#25D366]" />
              </div>
              <p className="font-semibold mb-1">WhatsApp Us</p>
              <p className="text-sm text-white/50">Quick responses</p>
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 text-center transition-all group"
            >
              <div className="w-12 h-12 bg-portland-red/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-portland-red/30 transition-colors">
                <Phone className="w-5 h-5 text-portland-red-light" />
              </div>
              <p className="font-semibold mb-1">Call Us</p>
              <p className="text-sm text-white/50">{SITE.phone}</p>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 text-center transition-all group"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/15 transition-colors">
                <MapPin className="w-5 h-5 text-white/70" />
              </div>
              <p className="font-semibold mb-1">Email Us</p>
              <p className="text-sm text-white/50">{SITE.email}</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AdmissionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-portland-gray">Loading...</div>
        </div>
      }
    >
      <AdmissionsContent />
    </Suspense>
  );
}
