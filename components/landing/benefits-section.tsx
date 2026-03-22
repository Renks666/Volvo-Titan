import { BENEFITS } from "@/lib/constants";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function BenefitsSection() {
  return (
    <section id="benefits" className="px-6 py-16 scroll-mt-32 md:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Почему нам доверяют"
          title="Сервис, который говорит по делу и делает на совесть"
          description="Мы не строим потоковый ремонт. Для нас важны точная диагностика, понятная коммуникация и реальный ресурс автомобиля после сервиса."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {BENEFITS.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.08}>
              <article className="glass-panel metal-border h-full rounded-[2rem] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  0{index + 1}
                </p>
                <h3 className="mt-5 text-xl font-semibold text-white">{benefit.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
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
