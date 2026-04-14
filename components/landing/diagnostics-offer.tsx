"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackCtaEvent } from "@/utils/analytics";

import { Reveal } from "./reveal";

const included = [
  "Компьютерное считывание ошибок всех блоков управления",
  "Визуальный осмотр ходовой и кузова",
  "Проверка уровней технических жидкостей",
  "Устный отчёт мастера по итогам осмотра",
];

export function DiagnosticsOffer() {
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
    <section className="px-0 py-[var(--landing-section-space)] md:py-12">
      <div className="section-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--landing-card-radius)] bg-gradient-to-br from-[#0d1e40] via-[#0a1830] to-[#060e1f] px-[var(--landing-card-padding-lg)] py-7 sm:rounded-[2rem] sm:px-10 sm:py-14 md:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(126,164,255,0.18),transparent_65%)] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(73,116,225,0.14),transparent_65%)] blur-3xl"
            />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-16">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--highlight)] sm:text-xs">
                  Специальное предложение
                </p>
                <h2 className="mt-3 font-heading text-2xl leading-tight text-white sm:text-3xl md:text-4xl">
                  Бесплатная диагностика
                  <br />
                  вашего Volvo
                </h2>
                <ul className="mt-6 space-y-3 sm:mt-8">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-200 sm:text-base">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-6 text-slate-400 sm:mt-7">
                  При записи через сайт или по телефону.
                  Занимает 30–40 минут.{" "}
                  <span className="text-slate-300">Никаких обязательств делать ремонт.</span>
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                  Запись ограничена — свяжитесь сегодня
                </p>
              </div>
              <div className="md:shrink-0">
                <button
                  type="button"
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-[var(--highlight)]/30 bg-[var(--highlight)]/10 px-7 py-5 text-sm font-semibold text-white transition hover:border-[var(--highlight)]/50 hover:bg-[var(--highlight)]/15 sm:inline-flex sm:w-auto sm:flex-row sm:gap-3 sm:rounded-xl sm:px-8 sm:py-4 md:flex-col md:gap-3 md:rounded-2xl md:px-10 md:py-8"
                  onClick={() => {
                    trackCtaEvent("lead_cta_click", { location: "diagnostics_offer" });
                    scrollToLeadSection();
                  }}
                >
                  <span className="text-4xl font-bold text-[var(--highlight)] sm:text-3xl md:text-5xl">0 ₽</span>
                  <span className="flex items-center gap-1.5">
                    Записаться на диагностику
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
