"use client";

import { ArrowUpRight } from "lucide-react";

import { SERVICES } from "@/lib/constants";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ServicesSection() {
  const scrollToLeadSection = () => {
    const target = document.getElementById("lead")?.querySelector<HTMLElement>(".section-shell");

    if (!target) {
      return;
    }

    const landingNavOffset = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--landing-nav-offset"),
    );
    const scrollOffset = Number.isFinite(landingNavOffset) ? landingNavOffset : 0;
    const nextTop = Math.max(window.scrollY + target.getBoundingClientRect().top - scrollOffset, 0);

    window.history.pushState(null, "", "#lead");
    window.scrollTo({ top: nextTop, behavior: "smooth" });
  };

  const handleServiceSelect = (serviceName: string) => {
    window.dispatchEvent(
      new CustomEvent("lead-service:selected", {
        detail: { serviceName },
      }),
    );

    scrollToLeadSection();
  };

  return (
    <section
      id="services"
      className="px-0 py-[var(--landing-section-space)] scroll-mt-[var(--landing-nav-offset)] md:py-24"
    >
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
            onClick={(event) => {
              event.preventDefault();
              scrollToLeadSection();
            }}
          >
            Записаться на сервис
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-7 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05} className="h-full">
              <button
                type="button"
                className="glass-panel metal-border group h-full w-full rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 focus-visible:-translate-y-1 focus-visible:border-white/30 focus-visible:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)] active:scale-[0.99] sm:rounded-[2rem] sm:p-6"
                onClick={() => handleServiceSelect(service.name)}
                aria-label={`${service.name} - перейти к форме заявки`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="max-w-44 text-lg font-semibold leading-6 text-white sm:max-w-52 sm:text-xl">
                    {service.name}
                  </h3>
                  <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[0.68rem] text-slate-300 transition group-hover:border-white/20 group-hover:text-white sm:px-3 sm:text-xs">
                    {service.price}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400 transition group-hover:text-slate-300 sm:mt-5 sm:leading-7">
                  {service.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition group-hover:text-white sm:mt-6">
                  Оставить заявку
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
