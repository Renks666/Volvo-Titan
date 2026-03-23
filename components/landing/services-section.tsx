import { ArrowUpRight } from "lucide-react";

import { SERVICES } from "@/lib/constants";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ServicesSection() {
  return (
    <section id="services" className="px-0 py-[var(--landing-section-space)] scroll-mt-28 md:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Услуги"
            title="От базовой диагностики до ремонта сложных узлов"
            description="Работаем с автомобилями Volvo всех популярных поколений. Если услуги нет в списке, сориентируем по телефону."
          />
          <a
            href="#lead"
            className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
          >
            Записаться на сервис
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-7 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <article className="glass-panel metal-border rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] sm:rounded-[2rem] sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="max-w-44 text-lg font-semibold leading-6 text-white sm:max-w-52 sm:text-xl">
                    {service.name}
                  </h3>
                  <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[0.68rem] text-slate-300 sm:px-3 sm:text-xs">
                    {service.price}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400 sm:mt-5 sm:leading-7">
                  Подберем понятный сценарий ремонта и заранее объясним, где критичный износ, а
                  где можно не торопиться.
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
