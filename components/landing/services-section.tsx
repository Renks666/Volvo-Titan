import { ArrowUpRight } from "lucide-react";

import { SERVICES } from "@/lib/constants";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ServicesSection() {
  return (
    <section id="services" className="px-6 py-16 scroll-mt-32 md:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Услуги"
            title="От базовой диагностики до ремонта сложных узлов"
            description="Работаем с автомобилями Volvo всех популярных поколений. Если услуга не указана в списке, подскажем по телефону."
          />
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
          >
            Записаться на сервис
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <article className="glass-panel metal-border rounded-[2rem] p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-52 text-xl font-semibold text-white">
                    {service.name}
                  </h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                    {service.price}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  Подберем понятный сценарий ремонта и заранее объясним, где
                  критичный износ, а где можно не торопиться.
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
