"use client";

import { ArrowRight, Phone } from "lucide-react";

import { CONTACT_INFO } from "@/lib/constants";
import { trackCtaEvent } from "@/utils/analytics";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    number: "01",
    title: "Оставьте заявку",
    description: "Онлайн или по телефону — 2 минуты",
    isAction: true,
  },
  {
    number: "02",
    title: "Мы перезвоним",
    description: "Уточним задачу и запишем на удобное время",
    isAction: false,
  },
  {
    number: "03",
    title: "Диагностика",
    description: "Осмотр и считывание ошибок — бесплатно",
    isAction: false,
  },
  {
    number: "04",
    title: "Согласование",
    description: "Называем полную стоимость. Вы решаете",
    isAction: false,
  },
  {
    number: "05",
    title: "Ремонт и выдача",
    description: "Объясняем что сделали. Выдаём гарантию",
    isAction: false,
  },
];

export function ProcessSection() {
  const scrollToLead = () => {
    trackCtaEvent("lead_cta_click", { location: "process" });
    const target = document.getElementById("lead");
    if (!target) return;

    const landingNavOffset = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--landing-nav-offset"),
    );
    const scrollOffset = Number.isFinite(landingNavOffset) ? landingNavOffset : 0;
    const top = Math.max(window.scrollY + target.getBoundingClientRect().top - scrollOffset, 0);
    window.history.pushState(null, "", "#lead");
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="px-0 py-[var(--landing-section-space)] md:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Как это работает"
          title="5 шагов — от заявки до выдачи"
        />
        <div className="mt-7 sm:mt-10">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.07}>
                <div className="relative flex h-full flex-col">
                  {step.isAction ? (
                    <button
                      type="button"
                      onClick={scrollToLead}
                      className="glass-panel metal-border flex h-full w-full flex-col rounded-[var(--landing-card-radius)] p-4 text-left transition hover:border-[var(--highlight)]/40 hover:bg-[var(--highlight)]/5 sm:rounded-[2rem] sm:p-6"
                    >
                      <p
                        className="font-heading text-4xl font-bold leading-none text-[var(--highlight)]/50 sm:text-5xl"
                        aria-hidden
                      >
                        {step.number}
                      </p>
                      <h3 className="mt-4 text-base font-semibold leading-snug text-[var(--highlight)] sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {step.description}
                      </p>
                    </button>
                  ) : (
                    <div className="glass-panel metal-border flex h-full flex-col rounded-[var(--landing-card-radius)] p-4 sm:rounded-[2rem] sm:p-6">
                      <p
                        className="font-heading text-4xl font-bold leading-none text-[var(--highlight)]/30 sm:text-5xl"
                        aria-hidden
                      >
                        {step.number}
                      </p>
                      <h3 className="mt-4 text-base font-semibold leading-snug text-white sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  )}
                  {index < steps.length - 1 && (
                    <div
                      className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
                      aria-hidden
                    >
                      <ArrowRight className="h-4 w-4 text-slate-600" />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-8 flex flex-col items-center gap-3 text-center sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
            <p className="w-full text-sm text-slate-400 sm:w-auto">
              Готовы? Первый шаг занимает 2 минуты
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={scrollToLead}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--highlight)] px-6 py-3 text-sm font-semibold text-[#050913] transition hover:bg-[var(--highlight)]/90"
              >
                Оставить заявку за 2 минуты
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() => trackCtaEvent("phone_click", { location: "process" })}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/8"
              >
                <Phone className="h-4 w-4" />
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
