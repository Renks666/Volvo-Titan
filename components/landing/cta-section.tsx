import { CTA_COPY } from "@/lib/constants";

import { LeadForm } from "./lead-form";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function CtaSection() {
  return (
    <section id="lead" className="px-6 py-16 scroll-mt-32 md:py-24">
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel metal-border grid gap-8 rounded-[2rem] px-6 py-8 md:grid-cols-[0.85fr_1.15fr] md:px-10 md:py-10">
            <div className="max-w-xl">
              <SectionHeading
                eyebrow="Заявка"
                title={CTA_COPY.sectionTitle}
                description={CTA_COPY.sectionSubtitle}
              />
              <div className="mt-8 grid gap-3 text-sm text-slate-400">
                <p>Ответим по телефону, WhatsApp или Telegram, если это будет удобнее.</p>
                <p>Форма уходит сразу в CRM и дублируется уведомлением в Telegram.</p>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 md:p-6">
              <LeadForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
