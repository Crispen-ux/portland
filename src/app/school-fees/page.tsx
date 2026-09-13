"use client";

import { useInView } from "@/lib/useInView";
import { SITE } from "@/lib/constants";
import Link from "next/link";
import {
  GraduationCap,
  CheckCircle,
  MessageSquare,
  Phone,
  ChevronRight,
  BookOpen,
  Users,
} from "lucide-react";

const fees = [
  {
    label: "Grade RR – Grade 7",
    amount: "R800",
    period: "per month",
    details: "Foundation and intermediate phase",
  },
  {
    label: "Grade 8 – Grade 11",
    amount: "R900",
    period: "per month",
    details: "Senior phase",
  },
];

const additionalCosts = [
  {
    label: "Registration Fee",
    amount: "R500",
    note: "One-time registration",
  },
  {
    label: "Annual Sports Levy",
    amount: "R300",
    note: "Covers sports activities for the year",
  },
  {
    label: "School Uniform",
    amount: "Free",
    note: "Provided at no cost to families",
  },
];

export default function SchoolFeesPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [feesRef, feesInView] = useInView(0.15);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        ref={heroRef}
        className="min-h-[100vh] flex items-center bg-portland-red text-white"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`max-w-2xl text-left transition-all duration-700 ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4 text-portland-red-light" />
              Transparent &amp; Affordable
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              School Fees
            </h1>
            <p className="text-lg sm:text-xl text-portland-mid max-w-2xl leading-relaxed">
              Portland Schools provides quality CAPS education at fees that respect
              your family&apos;s budget. Every learner receives a free school uniform.
            </p>
          </div>
        </div>
      </section>

      {/* Fee Cards */}
      <section ref={feesRef} className="py-20 bg-portland-light">
        <div
          className={`mx-auto max-w-5xl px-6 transition-all duration-700 ${
            feesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-portland-dark text-center mb-4">
            Monthly Tuition
          </h2>
          <p className="text-center text-portland-gray max-w-xl mx-auto mb-12">
            Simple, transparent pricing. No hidden costs.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {fees.map((fee) => (
              <div
                key={fee.label}
                className="bg-white rounded-2xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-portland-mid/30 hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                <p className="text-sm font-medium text-portland-gray uppercase tracking-wider mb-2">
                  {fee.label}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-bold text-portland-dark">
                    {fee.amount}
                  </span>
                  <span className="text-portland-gray text-sm">{fee.period}</span>
                </div>
                <p className="text-portland-gray text-sm">{fee.details}</p>
              </div>
            ))}
          </div>

          {/* Additional Costs */}
          <h3 className="text-2xl font-bold text-portland-dark text-center mb-8">
            Additional Costs
          </h3>
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {additionalCosts.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-6 text-center shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-portland-mid/30"
              >
                <p className="text-sm font-medium text-portland-gray mb-2">
                  {item.label}
                </p>
                <p className="text-3xl font-bold text-portland-dark mb-1">
                  {item.amount}
                </p>
                <p className="text-xs text-portland-gray">{item.note}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-portland-gray mb-6">
              Have questions about fees or want to discuss payment options?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={SITE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Ask About Fees on WhatsApp
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 bg-portland-red hover:bg-portland-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Start Admissions Enquiry
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-portland-dark text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How much are Portland Schools fees?",
                a: "Grade RR to Grade 7 is R800 per month. Grade 8 to Grade 11 is R900 per month. There is a once-off R500 registration fee and an R300 annual sports levy. School uniforms are provided free of charge.",
              },
              {
                q: "Is there a registration fee?",
                a: "Yes, there is a once-off R500 registration fee when enrolling your child.",
              },
              {
                q: "Do I need to buy a separate uniform?",
                a: "No. Portland Schools provides a free school uniform to every enrolled learner.",
              },
              {
                q: "Are there any hidden costs?",
                a: "No. The monthly fees cover tuition. The only additional costs are the R500 registration fee and R300 annual sports levy.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="border border-portland-mid/30 rounded-xl p-6"
              >
                <h3 className="font-semibold text-portland-dark mb-2">
                  {item.q}
                </h3>
                <p className="text-portland-gray leading-relaxed text-sm">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-portland-dark text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Learn More?
          </h2>
          <p className="text-portland-mid mb-8 max-w-xl mx-auto">
            Contact us to discuss fees, tour the school, or start the enrolment
            process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Us
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
      </section>
    </div>
  );
}
