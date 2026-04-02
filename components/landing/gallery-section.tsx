import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { existsSync } from "node:fs";
import path from "node:path";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const INTERIOR_PHOTOS = [
  { src: "/gallery/interior-1.jpg", alt: "Сервисная зона Volvo Titan" },
  { src: "/gallery/interior-2.jpg", alt: "Диагностическое оборудование" },
  { src: "/gallery/interior-3.jpg", alt: "Рабочее место механика" },
];

function fileExists(publicSrc: string) {
  return existsSync(path.join(process.cwd(), "public", publicSrc));
}

export function GallerySection() {
  const photos = INTERIOR_PHOTOS.map((p) => ({ ...p, exists: fileExists(p.src) }));

  return (
    <section id="gallery" className="px-0 py-[var(--landing-section-space)] md:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Сервисная зона"
          title="Наш сервис"
          description="Профессиональное оборудование — точная диагностика"
        />

        <Reveal>
          <div className="mt-7 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {photos.map((photo) =>
              photo.exists ? (
                <div
                  key={photo.src}
                  className="glass-panel metal-border overflow-hidden rounded-[var(--landing-card-radius)] sm:rounded-[2rem]"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div
                  key={photo.src}
                  className="flex aspect-[4/3] items-center justify-center rounded-[var(--landing-card-radius)] border border-dashed border-white/15 bg-white/[0.03] sm:rounded-[2rem]"
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                    {photo.alt}
                  </p>
                </div>
              ),
            )}
          </div>
        </Reveal>

        <div className="mt-7 flex justify-center sm:mt-10">
          <a
            href="#map"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/8"
          >
            Приезжайте — убедитесь сами
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
