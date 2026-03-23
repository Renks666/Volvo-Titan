import { CONTACT_INFO } from "@/lib/constants";

import { InteractiveMap } from "./interactive-map";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function MapSection() {
  return (
    <section className="px-0 pb-[var(--landing-section-space)] md:pb-24">
      <div className="section-shell">
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
    </section>
  );
}
