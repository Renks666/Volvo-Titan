import { CONTACT_INFO } from "@/lib/constants";

import { InteractiveMap } from "./interactive-map";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function MapSection() {
  return (
    <section className="px-0 pb-[var(--landing-section-space)] md:pb-24">
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
            <div className="h-[300px] w-full sm:h-[360px] md:h-[460px]">
              <InteractiveMap />
            </div>
          </div>
        </Reveal>
      </div>

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

        <Reveal delay={0.08}>
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
