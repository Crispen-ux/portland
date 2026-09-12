"use client";

import { useState, useEffect, useCallback } from "react";
import { X, MessageCircle, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import Link from "next/link";

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (dismissed) return;
      if (e.clientY <= 0) {
        setShow(true);
      }
    },
    [dismissed]
  );

  useEffect(() => {
    // Don't show if already dismissed this session
    if (typeof window !== "undefined" && sessionStorage.getItem("exit_popup_dismissed")) {
      setDismissed(true);
      return;
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("exit_popup_dismissed", "true");
    }
  };

  if (!show || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-portland-dark/60 backdrop-blur-sm animate-fade-in"
        onClick={dismiss}
      />

      {/* Popup */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
        {/* Red accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-portland-red via-portland-red-light to-portland-red" />

        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-portland-light hover:bg-portland-mid flex items-center justify-center transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-4 h-4 text-portland-dark" />
        </button>

        <div className="p-8 sm:p-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <img src="/portland logo.png" alt="" className="h-16 w-auto" aria-hidden="true" />
          </div>

          {/* Content */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-portland-dark text-center mb-3">
            Before You Go...
          </h3>
          <p className="text-portland-gray text-center text-base mb-2">
            Give your child the Portland advantage.
          </p>
          <p className="text-portland-gray text-center text-sm mb-8">
            Admissions are open for <strong className="text-portland-dark">{SITE.grades}</strong>. Quality education from just <strong className="text-portland-dark">{SITE.fees.gradeRRto7}/month</strong>.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 justify-center !py-3.5"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <Link
              href="/admissions"
              onClick={dismiss}
              className="btn-outline flex-1 justify-center !py-3.5"
            >
              Enrol Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Dismiss text */}
          <button
            onClick={dismiss}
            className="w-full text-center text-portland-gray/50 text-xs mt-5 hover:text-portland-gray transition-colors"
          >
            No thanks, I&apos;ll come back later
          </button>
        </div>
      </div>
    </div>
  );
}
