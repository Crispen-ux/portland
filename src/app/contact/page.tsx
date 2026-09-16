"use client";

import { useInView } from "@/lib/useInView";
import { SITE } from "@/lib/constants";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    label: "Phone",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    description: "Call us during school hours",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "Chat with us",
    href: SITE.whatsappLink,
    description: "Quick responses to your questions",
    color: "text-[#25D366]",
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    description: "Send us an enquiry",
  },
];

const schoolHours = [
  { day: "Monday – Friday", hours: "07:00 – 15:30" },
  { day: "Saturday & Sunday", hours: "Closed" },
];

export default function ContactPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [methodsRef, methodsInView] = useInView(0.15);
  const [locationRef, locationInView] = useInView(0.15);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        ref={heroRef}
        className="hero-section min-h-[100vh] flex items-center bg-[#D10000] text-white"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`max-w-2xl text-left transition-all duration-700 ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4 text-white" />
              Johannesburg
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              We&apos;d love to hear from you. Get in touch to learn about admissions,
              fees, or to book a school visit.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section ref={methodsRef} className="py-20 bg-portland-light">
        <div
          className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${
            methodsInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-portland-dark text-left mb-4">
            Get in Touch
          </h2>
          <p className="text-left text-portland-gray max-w-xl mb-12">
            Choose the way that works best for you.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="bg-white rounded-2xl p-8 text-left shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-portland-mid/30 hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-portland-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-portland-red/10 transition-colors">
                  <method.icon
                    className={`w-5 h-5 ${method.color || "text-portland-red"}`}
                  />
                </div>
                <p className="text-sm font-medium text-portland-gray mb-1">
                  {method.label}
                </p>
                <p className="text-lg font-semibold text-portland-dark mb-2">
                  {method.value}
                </p>
                <p className="text-xs text-portland-gray">
                  {method.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section ref={locationRef} className="py-20 bg-white">
        <div
          className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${
            locationInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid sm:grid-cols-2 gap-12">
            {/* Location */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-portland-dark mb-6">
                Our Location
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-portland-red mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-portland-dark">
                      {SITE.address}
                    </p>
                    <p className="text-sm text-portland-gray">
                      {SITE.addressLine2}
                    </p>
                    <p className="text-sm text-portland-gray">{SITE.city}</p>
                  </div>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent("188 Commissioner Street, Corner Commissioner and Polly Street, Johannesburg")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-portland-red hover:text-portland-red-dark font-medium text-sm transition-colors"
              >
                Get Directions
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Hours */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-portland-dark mb-6">
                School Hours
              </h2>
              <div className="bg-portland-light rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-portland-red" />
                  <p className="font-medium text-portland-dark">
                    Operating Hours
                  </p>
                </div>
                {schoolHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between items-center border-b border-portland-mid/30 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-portland-dark font-medium">
                      {item.day}
                    </span>
                    <span className="text-sm text-portland-gray">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-portland-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left">
            <GraduationCap className="w-10 h-10 text-portland-red-light mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Visit?
            </h2>
            <p className="text-portland-mid mb-8 max-w-xl">
              Book a school visit to meet our team, see our classrooms, and learn
              more about Portland Schools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Book a School Visit
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 bg-white text-portland-dark hover:bg-portland-light font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Admissions
              <ChevronRight className="w-4 h-4" />
            </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
