import { Clock } from "lucide-react";

import { CTA_COPY } from "@/lib/constants";

import { LeadForm } from "./lead-form";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function CtaSection() {
  return (
    <section
      id="lead"
      className="px-0 py-[var(--landing-section-space)] scroll-mt-[var(--landing-nav-offset)] md:py-24"
    >
      <div className="section-shell">
        <Reveal>
          <div className="mb-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm font-medium text-red-300 sm:mb-5 sm:flex-nowrap">
            <Clock className="h-4 w-4 shrink-0 text-red-400" />
            <span>Осталось 3 места на этой неделе — запись ограничена</span>
          </div>
          <div className="glass-panel metal-border grid gap-5 rounded-[var(--landing-card-radius)] px-[var(--landing-card-padding-lg)] py-[var(--landing-card-padding-lg)] sm:gap-8 sm:rounded-[2rem] sm:px-6 sm:py-8 md:grid-cols-[0.85fr_1.15fr] md:px-10 md:py-10">
            <div className="max-w-xl">
              <SectionHeading
                eyebrow="Запись онлайн"
                title={CTA_COPY.sectionTitle}
                description={CTA_COPY.sectionSubtitle}
              />
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 sm:rounded-[1.75rem] sm:p-5 md:p-6">
              <LeadForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
