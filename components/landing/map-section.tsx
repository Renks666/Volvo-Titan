import { CONTACT_INFO } from "@/lib/constants";

import { InteractiveMap } from "./interactive-map";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function MapSection() {
  return (
    <section className="px-6 pb-16 md:pb-24">
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel metal-border overflow-hidden rounded-[2rem]">
            <div className="border-b border-white/10 px-6 py-6 md:px-8">
              <SectionHeading
                eyebrow="Карта"
                title="Легко найти и быстро доехать"
                description={CONTACT_INFO.address}
              />
            </div>
            <div className="h-[360px] w-full md:h-[460px]">
              <InteractiveMap />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
