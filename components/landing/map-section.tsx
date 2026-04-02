import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

import { CONTACT_INFO } from "@/lib/constants";

import { InteractiveMap } from "./interactive-map";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const exteriorSrc = "/gallery/exterior.jpg";
const exteriorPath = path.join(process.cwd(), "public", "gallery", "exterior.jpg");

export function MapSection() {
  const hasExterior = existsSync(exteriorPath);

  return (
    <section id="map" className="px-0 pb-[var(--landing-section-space)] md:pb-24">
      {/* Desktop */}
      <div className="section-shell hidden md:block">
        <Reveal>
          <div className="glass-panel metal-border overflow-hidden rounded-[var(--landing-card-radius)] sm:rounded-[2rem]">
            <div className="border-b border-white/10 px-[var(--landing-card-padding-lg)] py-4 sm:px-6 sm:py-6 md:px-8">
              <SectionHeading
                eyebrow="Карта"
                title="Легко найти и быстро доехать"
                description={CONTACT_INFO.address}
              />
            </div>

            {hasExterior ? (
              <div className="grid md:grid-cols-[1fr_1.65fr]">
                <div className="relative border-r border-white/10">
                  <div className="relative h-[300px] md:h-[460px]">
                    <Image
                      src={exteriorSrc}
                      alt="Здание Volvo Titan, ул. Измайловского Зверинца 8"
                      fill
                      sizes="(max-width: 1024px) 40vw, 32vw"
                      className="object-contain object-center"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-200">
                      Вход со стороны ул. Измайловского Зверинца
                    </p>
                  </div>
                </div>
                <div className="h-[300px] md:h-[460px]">
                  <InteractiveMap />
                </div>
              </div>
            ) : (
              <div className="h-[300px] w-full sm:h-[360px] md:h-[460px]">
                <InteractiveMap />
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <Reveal>
          <div className="px-4 pb-4">
            <div className="border-b border-white/10 pb-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[var(--steel)]">
                Карта
              </p>
              <h2 className="mt-3 max-w-[12ch] text-[1.9rem] font-semibold leading-[1.02] text-white">
                Легко найти и быстро доехать
              </h2>
              <p className="mt-3 max-w-[32rem] text-sm leading-6 text-slate-400">
                {CONTACT_INFO.address}
              </p>
            </div>
          </div>
        </Reveal>

        {hasExterior && (
          <Reveal delay={0.06}>
            <div className="relative mx-4 mb-3 overflow-hidden rounded-[1.5rem] border border-white/10">
              <div className="relative aspect-[16/9]">
                <Image
                  src={exteriorSrc}
                  alt="Здание Volvo Titan, ул. Измайловского Зверинца 8"
                  fill
                  sizes="90vw"
                  className="object-contain object-center"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-200">
                  Вход со стороны ул. Измайловского Зверинца
                </p>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={hasExterior ? 0.12 : 0.08}>
          <div className="vt-mobile-map-frame">
            <div className="vt-mobile-map-surface">
              <InteractiveMap />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
