"use client";

import { useInView } from "@/lib/useInView";
import { SITE } from "@/lib/constants";
import Link from "next/link";
import EnrolForm from "@/components/EnrolForm";
import {
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Shirt,
  Bus,
  Search,
  Eye,
  FileText,
  PartyPopper,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Enquire",
    desc: "Contact our admissions team via WhatsApp or phone.",
  },
  {
    icon: Eye,
    title: "Visit",
    desc: "Come and experience Portland for yourself.",
  },
  {
    icon: FileText,
    title: "Apply",
    desc: "Complete the enrolment process and submit the required documents.",
  },
  {
    icon: PartyPopper,
    title: "Join the Portland Family",
    desc: "Welcome to Portland! Your child's journey begins.",
  },
];

export default function AdmissionsPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [feesRef, feesInView] = useInView(0.1);
  const [stepsRef, stepsInView] = useInView(0.1);
  const [contactRef, contactInView] = useInView(0.1);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center overflow-hidden bg-portland-red"
      >
        {/* Decorative accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-portland-dark/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div
            className={`transition-all duration-700 ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-white/70 tracking-[0.2em] mb-4 block">
              Admissions
            </span>
            <h1 className="text-display text-white mb-6">
              Your Portland Journey{" "}
              <span className="text-white/70">Starts Here.</span>
            </h1>
            <p className="text-xl text-white/70 mb-2">
              Admissions are open
            </p>
            <p className="text-white/50 text-base">{SITE.grades}</p>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section ref={feesRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              feesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
              Fees
            </span>
            <h2 className="text-editorial text-portland-dark">
              Our Fees
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Grade RR - 7 */}
            <div
              className={`bg-white rounded-2xl p-8 text-center border border-portland-mid/30 shadow-editorial transition-all duration-700 ${
                feesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <p className="text-portland-gray text-xs uppercase tracking-widest mb-3 font-medium">
                Grade RR – Grade 7
              </p>
              <p className="text-5xl sm:text-6xl font-extrabold text-portland-dark mb-2">
                {SITE.fees.gradeRRto7}
                <span className="text-lg text-portland-gray font-normal">/month</span>
              </p>
            </div>

            {/* Grade 8 - 11 */}
            <div
              className={`bg-white rounded-2xl p-8 text-center border border-portland-mid/30 shadow-editorial transition-all duration-700 delay-100 ${
                feesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <p className="text-portland-gray text-xs uppercase tracking-widest mb-3 font-medium">
                Grade 8 – Grade 11
              </p>
              <p className="text-5xl sm:text-6xl font-extrabold text-portland-dark mb-2">
                {SITE.fees.grade8to11}
                <span className="text-lg text-portland-gray font-normal">/month</span>
              </p>
            </div>
          </div>

          {/* Additional */}
          <div
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 ${
              feesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-2 bg-portland-light rounded-xl px-5 py-2.5">
              <span className="text-portland-gray text-sm">Registration: </span>
              <span className="text-portland-dark font-semibold text-sm">
                {SITE.fees.registration} once-off
              </span>
            </div>
            <div className="flex items-center gap-2 bg-portland-light rounded-xl px-5 py-2.5">
              <span className="text-portland-gray text-sm">Sports Levy: </span>
              <span className="text-portland-dark font-semibold text-sm">
                {SITE.fees.sportsLevy} per year
              </span>
            </div>
          </div>

          {/* Uniform & Transport */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto transition-all duration-700 ${
              feesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-2xl p-6 border border-portland-mid/30 shadow-editorial flex items-center gap-4">
              <div className="w-12 h-12 bg-portland-red/8 rounded-xl flex items-center justify-center shrink-0">
                <Shirt className="w-6 h-6 text-portland-red" />
              </div>
              <div>
                <h3 className="font-bold text-portland-dark mb-1 text-sm">
                  Free School Uniform
                </h3>
                <p className="text-portland-gray text-xs">
                  Every learner receives their school uniform FREE.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-portland-mid/30 shadow-editorial flex items-center gap-4">
              <div className="w-12 h-12 bg-portland-red/8 rounded-xl flex items-center justify-center shrink-0">
                <Bus className="w-6 h-6 text-portland-red" />
              </div>
              <div>
                <h3 className="font-bold text-portland-dark mb-1 text-sm">
                  School Transport
                </h3>
                <p className="text-portland-gray text-xs">
                  Transport options available for families who require them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrol Form */}
      <EnrolForm />

      {/* How to Enrol */}
      <section ref={stepsRef} className="py-24 bg-portland-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              stepsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
              The Process
            </span>
            <h2 className="text-editorial text-portland-dark">
              How to Enrol
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={`text-center group transition-all duration-700 ${
                    stepsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Step number */}
                  <div className="relative inline-block mb-5">
                    <div className="w-14 h-14 bg-portland-red rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-portland-red/20">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-portland-dark text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-portland-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-portland-gray text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-portland-red tracking-[0.2em] mb-4 block">
              Get in Touch
            </span>
            <h2 className="text-editorial text-portland-dark">
              Contact Portland
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact details */}
            <div
              className={`transition-all duration-700 ${
                contactInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-portland-red/8 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-portland-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-portland-dark mb-1">
                      Address
                    </h3>
                    <p className="text-portland-gray">{SITE.address}</p>
                    <p className="text-portland-gray">
                      {SITE.addressLine2}, {SITE.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-portland-red/8 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-portland-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-portland-dark mb-1">
                      Phone
                    </h3>
                    <a
                      href={`tel:${SITE.phone}`}
                      className="text-portland-gray hover:text-portland-red transition-colors"
                    >
                      {SITE.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={SITE.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 justify-center"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${SITE.phone}`}
                  className="btn-outline flex-1 justify-center"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </div>
            </div>

            {/* Google Map */}
            <div
              className={`transition-all duration-700 delay-200 ${
                contactInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="rounded-2xl overflow-hidden shadow-editorial-lg aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps?q=188+Commissioner+Street,+Corner+Commissioner+and+Polly+Street,+Johannesburg&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Portland Group of Schools — 188 Commissioner Street, Johannesburg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
