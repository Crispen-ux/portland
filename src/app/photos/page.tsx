"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/lib/useInView";
import { PHOTOS, CATEGORIES, type Category, type Photo } from "@/lib/photos";
import { X, ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export default function PhotosPage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "All"
      ? PHOTOS
      : PHOTOS.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  }, [lightboxIndex, filteredPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, nextPhoto, prevPhoto]);

  const lightboxPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center overflow-hidden bg-portland-dark"
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-portland-red/8 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-portland-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`max-w-2xl transition-all duration-700 ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-eyebrow text-portland-red-light tracking-[0.2em] mb-4 block">
              Photo Gallery
            </span>
            <h1 className="text-display text-white mb-6">
              Life at{" "}
              <span className="text-gradient bg-gradient-to-r from-portland-red-light to-[#FF6B6B] bg-clip-text text-transparent">
                Portland
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-lg leading-relaxed">
              A glimpse into learning, growing and making memories at Portland Schools.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? PHOTOS.length
                  : PHOTOS.filter((p) => p.category === cat).length;
              if (cat !== "All" && count === 0) return null;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-portland-red text-white shadow-lg shadow-portland-red/20"
                      : "bg-portland-light text-portland-dark hover:bg-portland-red/10 hover:text-portland-red border border-portland-mid/50"
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 text-xs ${activeCategory === cat ? "text-white/70" : "text-portland-gray"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Photo grid */}
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo, i) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  index={i}
                  onClick={() => openLightbox(i)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-portland-gray text-lg">
                No photos in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-portland-dark/90 backdrop-blur-sm animate-fade-in"
            onClick={closeLightbox}
          />

          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
              aria-label="Close photo viewer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Previous button */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Next button */}
            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Image */}
            <div className="relative max-w-5xl w-full max-h-[80vh] flex items-center justify-center animate-fade-in">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.alt}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center animate-fade-in">
              <p className="text-white/80 text-sm font-medium">
                {lightboxPhoto.caption}
              </p>
              <p className="text-white/40 text-xs mt-1">
                {lightboxPhoto.category} · {lightboxIndex! + 1} of {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Admissions CTA */}
      <section className="py-20 bg-portland-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-portland-dark mb-4">
            See Yourself at Portland?
          </h2>
          <p className="text-portland-gray mb-8 max-w-lg mx-auto">
            Interested in joining our school community? We&apos;d love to hear from
            you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center gap-2 bg-portland-red hover:bg-portland-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Explore Admissions
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/school-fees"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-portland-light text-portland-dark font-semibold px-6 py-3 rounded-xl border border-portland-mid/30 transition-colors"
            >
              View Fees
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PhotoCard({
  photo,
  index,
  onClick,
}: {
  photo: Photo;
  index: number;
  onClick: () => void;
}) {
  const [ref, inView] = useInView(0.05);

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden bg-portland-light transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${Math.min(index * 80, 400)}ms` }}
    >
      <button
        onClick={onClick}
        className="w-full text-left cursor-pointer"
        aria-label={`View: ${photo.alt}`}
      >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-portland-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Caption on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-[10px] text-portland-red-light uppercase tracking-widest font-semibold">
          {photo.category}
        </span>
        <p className="text-white text-sm font-medium mt-0.5">
          {photo.caption}
        </p>
      </div>
    </button>
    </div>
  );
}
