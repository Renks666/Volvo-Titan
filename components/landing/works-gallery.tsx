"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

import { Reveal } from "./reveal";
import { useBodyScrollLock, useEscapeKey } from "@/components/ui/overlay";

export type WorkItem = {
  src: string;
  title: string;
  model: string;
  exists: boolean;
};

type WorksGalleryProps = {
  works: WorkItem[];
};

export function WorksGallery({ works }: WorksGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isOpen = lightboxIndex !== null;

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + works.length) % works.length;
    });
  }, [works.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % works.length;
    });
  }, [works.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, goPrev, goNext]);

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, closeLightbox);

  const imageWorks = works.filter((w) => w.exists);

  return (
    <>
      {/* Mobile: horizontal snap scroll — no Reveal wrappers to avoid float glitch */}
      <div className="-mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:hidden">
        {works.map((work, index) => (
          <div
            key={work.src}
            className="glass-panel metal-border w-[82vw] max-w-[18rem] shrink-0 snap-center overflow-hidden rounded-[var(--landing-card-radius)]"
            onClick={() => work.exists && openLightbox(imageWorks.indexOf(work))}
            style={{ cursor: work.exists ? "pointer" : "default" }}
          >
            {work.exists ? (
              <div className="relative aspect-[4/3]">
                <Image
                  src={work.src}
                  alt={`${work.title} · ${work.model}`}
                  fill
                  sizes="82vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/10" />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center border-b border-dashed border-white/15 bg-white/[0.04]">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                  Фото работы
                </p>
              </div>
            )}
            <div className="p-4">
              <p className="text-sm font-semibold text-white">{work.title}</p>
              <p className="mt-1 text-xs text-slate-400">{work.model}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: 4-column grid with reveal animations */}
      <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-2 md:grid-cols-4">
        {works.map((work, index) => (
          <Reveal key={work.src} delay={index * 0.08}>
            <div
              className="glass-panel metal-border overflow-hidden rounded-[var(--landing-card-radius)] sm:rounded-[2rem]"
              onClick={() => work.exists && openLightbox(imageWorks.indexOf(work))}
              style={{ cursor: work.exists ? "pointer" : "default" }}
            >
              {work.exists ? (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={work.src}
                    alt={`${work.title} · ${work.model}`}
                    fill
                    sizes="(max-width: 768px) 45vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center border-b border-dashed border-white/15 bg-white/[0.04]">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                    Фото работы
                  </p>
                </div>
              )}
              <div className="p-4 sm:p-5">
                <p className="text-sm font-semibold text-white">{work.title}</p>
                <p className="mt-1 text-xs text-slate-400">{work.model}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && lightboxIndex !== null && imageWorks[lightboxIndex] ? (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeLightbox}
              aria-hidden
            />

            {/* Content */}
            <motion.div
              className="fixed inset-0 z-[91] flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.target === e.currentTarget && closeLightbox()}
            >
              <div className="relative flex w-full max-w-3xl flex-col">
                {/* Image */}
                <div className="relative w-full overflow-hidden rounded-2xl">
                  <Image
                    src={imageWorks[lightboxIndex].src}
                    alt={`${imageWorks[lightboxIndex].title} · ${imageWorks[lightboxIndex].model}`}
                    width={1200}
                    height={900}
                    className="h-auto w-full object-contain"
                    priority
                  />
                </div>

                {/* Caption */}
                <div className="mt-3 flex items-center justify-between px-1">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {imageWorks[lightboxIndex].title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {imageWorks[lightboxIndex].model}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {lightboxIndex + 1} / {imageWorks.length}
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                type="button"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition hover:bg-white/15"
                onClick={closeLightbox}
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Prev button */}
              {imageWorks.length > 1 && (
                <button
                  type="button"
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition hover:bg-white/15"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {/* Next button */}
              {imageWorks.length > 1 && (
                <button
                  type="button"
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition hover:bg-white/15"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  aria-label="Следующее фото"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
