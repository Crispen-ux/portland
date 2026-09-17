"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "portland_entry_popup_dismissed";

export default function EntryPopup() {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) {
      setReady(false);
      return;
    }
    const timer = setTimeout(() => {
      setShow(true);
      setReady(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    setShow(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [show, dismiss]);

  if (!show || !ready) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Special enrolment offer"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={dismiss}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        <div className="h-1.5 bg-gradient-to-r from-[#D10000] via-[#E8344F] to-[#D10000]" />

        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-portland-light hover:bg-portland-mid flex items-center justify-center transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-4 h-4 text-portland-dark" />
        </button>

        <div className="p-8 sm:p-10 text-center">
          <div className="flex justify-center mb-5">
            <img src="/logo.png" alt="Portland Schools" className="h-20 w-auto" />
          </div>

          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-[#D10000] bg-[#D10000]/8 px-4 py-1.5 rounded-full mb-5">
            Special Enrolment Offer
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-portland-dark mb-2 leading-tight">
            FREE SCHOOL
            <br />
            UNIFORM
          </h2>
          <p className="text-base font-semibold text-[#D10000] mb-3">
            Included with Every Enrolment
          </p>
          <p className="text-sm text-portland-gray leading-relaxed mb-8 max-w-sm mx-auto">
            Give your child a great start. Register now and receive a school uniform at no additional cost.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/admissions"
              onClick={dismiss}
              className="btn-primary justify-center !py-3.5 text-base"
            >
              Register Now
            </Link>
            <button
              onClick={dismiss}
              className="btn-outline justify-center !py-3.5 text-base w-full"
            >
              Enter Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
