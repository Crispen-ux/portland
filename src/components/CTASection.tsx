"use client";

import { useInView } from "@/lib/useInView";
import { SITE } from "@/lib/constants";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function CTASection() {
  const [ref, inView] = useInView(0.15);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=85&auto=format&fit=crop"
          alt="Portland learners celebrating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            WE BELIEVE IN{" "}
            <span className="text-portland-red-light">YOUR CHILD.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/80 mb-3">
            Now let&apos;s build their future together.
          </p>
          <p className="text-white/60 text-lg mb-4">
            Admissions are open for {SITE.grades}.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-10">
            <MapPin className="w-4 h-4" />
            <span>
              {SITE.address}, {SITE.addressLine2}, {SITE.city}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="btn-primary text-lg !py-4 !px-10 !bg-white !text-portland-dark hover:!shadow-[0_8px_30px_rgba(255,255,255,0.3)] group"
            >
              ENROL NOW
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg !py-4 !px-10"
            >
              💬 WHATSAPP US
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
