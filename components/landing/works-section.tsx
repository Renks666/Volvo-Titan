import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { existsSync } from "node:fs";
import path from "node:path";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type WorkItem = {
  src: string;
  title: string;
  model: string;
};

const WORKS: WorkItem[] = [
  { src: "/works/work-1.jpg", title: "Диагностика двигателя", model: "Volvo XC90" },
  { src: "/works/work-2.jpg", title: "Техническое обслуживание", model: "Volvo XC60" },
  { src: "/works/work-3.jpg", title: "Ремонт двигателя", model: "Volvo S60" },
  { src: "/works/work-4.jpg", title: "Ремонт двигателя", model: "Volvo V60" },
];

function fileExists(publicSrc: string) {
  return existsSync(path.join(process.cwd(), "public", publicSrc));
}

export function WorksSection() {
  const works = WORKS.map((w) => ({ ...w, exists: fileExists(w.src) }));

  return (
    <section id="works" className="px-0 py-[var(--landing-section-space)] md:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Портфолио"
          title="Наши работы"
          description="Реальные кейсы — что привезли, что сделали"
        />

        {/* Mobile: horizontal snap scroll */}
        <div className="-mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:hidden">
          {works.map((work, index) => (
            <Reveal key={work.src} delay={index * 0.06}>
              <div className="glass-panel metal-border w-[82vw] max-w-[18rem] shrink-0 snap-center overflow-hidden rounded-[var(--landing-card-radius)]">
                {work.exists ? (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={work.src}
                      alt={`${work.title} · ${work.model}`}
                      fill
                      sizes="82vw"
                      className="object-cover"
                    />
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
            </Reveal>
          ))}
        </div>

        {/* Desktop: 4-column grid */}
        <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-2 md:grid-cols-4">
          {works.map((work, index) => (
            <Reveal key={work.src} delay={index * 0.08}>
              <div className="glass-panel metal-border overflow-hidden rounded-[var(--landing-card-radius)] sm:rounded-[2rem]">
                {work.exists ? (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={work.src}
                      alt={`${work.title} · ${work.model}`}
                      fill
                      sizes="(max-width: 768px) 45vw, 25vw"
                      className="object-cover"
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

        <div className="mt-7 flex justify-center sm:mt-10">
          <a
            href="#lead"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--highlight)] px-7 py-3.5 text-sm font-semibold text-[#050913] transition hover:bg-[var(--highlight)]/90"
          >
            Записаться на диагностику
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
