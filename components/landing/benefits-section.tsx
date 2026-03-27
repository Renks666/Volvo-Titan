"use client";

import { ArrowRight } from "lucide-react";

import { BENEFITS } from "@/lib/constants";
import { trackCtaEvent } from "@/utils/analytics";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function BenefitsSection() {
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

  return (
    <section
      id="benefits"
      className="px-0 py-[var(--landing-section-space)] scroll-mt-[var(--landing-nav-offset)] md:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow="Почему нам доверяют"
          title="Почему владельцы Volvo выбирают нас"
          description="Мы не строим потоковый ремонт. Специализация на одной марке, честная диагностика и работа без навязывания — вот почему к нам возвращаются."
        />
        <div className="mt-7 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {BENEFITS.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.07}>
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
        <Reveal delay={0.2}>
          <div className="mt-8 text-center sm:mt-10">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--highlight)]/30 bg-[var(--highlight)]/8 px-6 py-3 text-sm font-semibold text-[var(--highlight)] transition hover:border-[var(--highlight)]/50 hover:bg-[var(--highlight)]/12"
              onClick={() => {
                trackCtaEvent("lead_cta_click", { location: "benefits" });
                scrollToLeadSection();
              }}
            >
              Записаться на диагностику
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
