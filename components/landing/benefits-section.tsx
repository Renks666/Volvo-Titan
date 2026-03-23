import { BENEFITS } from "@/lib/constants";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function BenefitsSection() {
  return (
    <section id="benefits" className="px-0 py-[var(--landing-section-space)] scroll-mt-28 md:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Почему нам доверяют"
          title="Сервис, который говорит по делу и делает на совесть"
          description="Мы не строим потоковый ремонт. Для нас важны точная диагностика, понятная коммуникация и реальный ресурс автомобиля после сервиса."
        />
        <div className="mt-7 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {BENEFITS.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.08}>
              <article className="glass-panel metal-border h-full rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] sm:rounded-[2rem] sm:p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500 sm:text-xs sm:tracking-[0.3em]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-lg font-semibold leading-6 text-white sm:mt-5 sm:text-xl">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300 sm:mt-4 sm:leading-7">
                  {benefit.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
