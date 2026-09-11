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
    title: "ENQUIRE",
    desc: "Contact our admissions team via WhatsApp or phone.",
  },
  {
    icon: Eye,
    title: "VISIT",
    desc: "Come and experience Portland for yourself.",
  },
  {
    icon: FileText,
    title: "APPLY",
    desc: "Complete the enrolment process and submit the required documents.",
  },
  {
    icon: PartyPopper,
    title: "JOIN THE PORTLAND FAMILY",
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
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=85&auto=format&fit=crop"
            alt="Portland Group of Schools admissions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              heroInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-white/60 font-semibold text-sm uppercase tracking-widest mb-4">
              Admissions
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              YOUR PORTLAND JOURNEY{" "}
              <span className="text-portland-red-light">STARTS HERE.</span>
            </h1>
            <p className="text-xl text-white/70 mb-2">
              Admissions are open
            </p>
            <p className="text-white/50 text-lg">{SITE.grades}</p>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section ref={feesRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              feesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark mb-4">
              OUR FEES
            </h2>
            <div className="w-20 h-1 bg-portland-red rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Grade RR - 7 */}
            <div
              className={`card-premium text-center transition-all duration-700 ${
                feesInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <p className="text-portland-gray text-sm uppercase tracking-wider mb-3 font-medium">
                Grade RR – Grade 7
              </p>
              <p className="text-5xl sm:text-6xl font-extrabold text-portland-dark mb-2">
                {SITE.fees.gradeRRto7}
                <span className="text-lg text-portland-gray font-normal">
                  /month
                </span>
              </p>
            </div>

            {/* Grade 8 - 11 */}
            <div
              className={`card-premium text-center transition-all duration-700 delay-100 ${
                feesInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <p className="text-portland-gray text-sm uppercase tracking-wider mb-3 font-medium">
                Grade 8 – Grade 11
              </p>
              <p className="text-5xl sm:text-6xl font-extrabold text-portland-dark mb-2">
                {SITE.fees.grade8to11}
                <span className="text-lg text-portland-gray font-normal">
                  /month
                </span>
              </p>
            </div>
          </div>

          {/* Additional */}
          <div
            className={`flex flex-wrap justify-center gap-6 mb-12 transition-all duration-1000 delay-300 ${
              feesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-2 bg-portland-light rounded-xl px-6 py-3">
              <span className="text-portland-gray text-sm">Registration: </span>
              <span className="text-portland-dark font-bold">
                {SITE.fees.registration} once-off
              </span>
            </div>
            <div className="flex items-center gap-2 bg-portland-light rounded-xl px-6 py-3">
              <span className="text-portland-gray text-sm">Sports Levy: </span>
              <span className="text-portland-dark font-bold">
                {SITE.fees.sportsLevy} per year
              </span>
            </div>
          </div>

          {/* Uniform & Transport */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
              feesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="card-premium flex items-center gap-4">
              <div className="w-14 h-14 bg-portland-red/8 rounded-2xl flex items-center justify-center shrink-0">
                <Shirt className="w-7 h-7 text-portland-red" />
              </div>
              <div>
                <h3 className="font-bold text-portland-dark mb-1">
                  FREE SCHOOL UNIFORM
                </h3>
                <p className="text-portland-gray text-sm">
                  Every learner receives their school uniform FREE.
                </p>
              </div>
            </div>

            <div className="card-premium flex items-center gap-4">
              <div className="w-14 h-14 bg-portland-red/8 rounded-2xl flex items-center justify-center shrink-0">
                <Bus className="w-7 h-7 text-portland-red" />
              </div>
              <div>
                <h3 className="font-bold text-portland-dark mb-1">
                  SCHOOL TRANSPORT
                </h3>
                <p className="text-portland-gray text-sm">
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
      <section ref={stepsRef} className="py-20 bg-portland-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              stepsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark mb-4">
              HOW TO ENROL
            </h2>
            <div className="w-20 h-1 bg-portland-red rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={`text-center group transition-all duration-700 ${
                    stepsInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {/* Step number */}
                  <div className="relative inline-block mb-5">
                    <div className="w-16 h-16 bg-portland-red rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-portland-red/20">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-portland-dark text-white text-xs font-bold rounded-full flex items-center justify-center">
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
      <section ref={contactRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              contactInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-portland-dark mb-4">
              CONTACT PORTLAND
            </h2>
            <p className="text-portland-gray text-lg">
              We&apos;re ready to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact details */}
            <div
              className={`transition-all duration-1000 ${
                contactInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
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
                    <p className="text-portland-gray">
                      {SITE.address}
                    </p>
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
                  WHATSAPP US
                </a>
                <Link
                  href="/admissions"
                  className="btn-outline flex-1 justify-center"
                >
                  ENROL NOW
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Google Map */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                contactInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="rounded-3xl overflow-hidden shadow-premium-lg aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.123456789!2d28.0473!3d-26.2041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzE0LjgiUyAyOMKwMDInNTAuMyJF!5e0!3m2!1sen!2sza!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Portland Group of Schools location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
