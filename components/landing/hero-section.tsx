"use client";

import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  PhoneCall,
  ShieldCheck,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";
import { CONTACT_INFO } from "@/lib/constants";
import { trackCtaEvent } from "@/utils/analytics";

const heroHighlights = [
  {
    icon: Calendar,
    text: "Работаем с 1995 года",
  },
  {
    icon: Star,
    text: "5 000+ авто обслужено",
  },
  {
    icon: BadgeCheck,
    text: "Диагностика — бесплатно",
  },
] as const;

export function HeroSection() {
  const parallaxOffset = useParallax(0.16);

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
      id="hero"
      className="relative isolate overflow-hidden px-0 pb-[var(--landing-section-space)] pt-[calc(var(--landing-nav-offset)+0.5rem)] scroll-mt-[var(--landing-nav-offset)] sm:pt-28 md:pb-28 md:pt-32"
    >
      <div className="section-shell">
        <div className="glass-panel metal-border relative overflow-hidden rounded-[var(--landing-card-radius)] px-[var(--landing-card-padding-lg)] py-[var(--landing-card-padding-lg)] sm:rounded-[2rem] sm:px-6 sm:py-8 md:px-10 md:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(191,214,255,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(73,116,225,0.2),transparent_28%)]" />
          <motion.div
            aria-hidden
            className="absolute -right-14 top-10 hidden h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(238,244,255,0.32),rgba(255,255,255,0.02)_65%,transparent_75%)] blur-xl md:block"
            style={{ y: parallaxOffset * -0.35 }}
          />
          <div className="relative grid items-center gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-slate-300 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.25em]">
                <ShieldCheck className="h-4 w-4 text-[var(--highlight)]" />
                Специализированный сервис Volvo · Москва
              </div>
              <h1 className="mt-4 max-w-[12ch] font-heading text-[2.35rem] leading-[1.02] text-white sm:mt-5 sm:max-w-[14ch] sm:text-5xl md:mt-6 md:max-w-3xl md:text-6xl">
                <span className="mr-3 inline-block">Ремонт</span>
                <span
                  className="inline-block align-baseline text-[1.18em] font-bold leading-none tracking-[0.05em] text-[#1f4698] md:text-[1.24em]"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  VOLVO
                </span>
                <br className="hidden sm:block" />
                <span className="block h-1.5 sm:hidden" aria-hidden />
                без переплат
              </h1>
              <p className="mt-4 max-w-[36rem] text-[0.98rem] leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
                Диагностируем честно, объясняем понятно — только то, что реально нужно.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
                <a
                  href="#lead"
                  onClick={(event) => {
                    event.preventDefault();
                    trackCtaEvent("lead_cta_click", { location: "hero" });
                    scrollToLeadSection();
                  }}
                >
                  <Button className="w-full sm:w-auto">
                    Записаться онлайн
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() => trackCtaEvent("phone_click", { location: "hero" })}
                >
                  <Button className="w-full sm:w-auto" variant="secondary">
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Позвонить
                  </Button>
                </a>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-[var(--highlight)]/20 bg-[var(--highlight)]/5 px-4 py-2.5 text-sm text-slate-200 sm:mt-5 sm:inline-flex">
                <span className="text-[var(--highlight)]">🔧</span>
                <span className="font-medium">Диагностика бесплатно</span>
                <span className="hidden text-slate-500 sm:inline">·</span>
                <span className="text-slate-400">Замена масла от 1 500 ₽</span>
              </div>
              <div className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 lg:flex lg:flex-nowrap">
                {heroHighlights.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="inline-flex min-h-11 items-center gap-2 rounded-[1rem] border border-white/10 bg-white/[0.07] px-3 py-2.5 text-xs text-slate-200 backdrop-blur-sm sm:rounded-full sm:py-2 sm:text-sm"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <Icon className="h-3.5 w-3.5 text-[var(--highlight)]" />
                    </div>
                    <span className="font-medium leading-snug">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden sm:block">
              <motion.div
                className="glass-panel metal-border relative mx-auto max-w-sm overflow-hidden rounded-[1.5rem] p-3.5 sm:max-w-md sm:rounded-[2rem] sm:p-5"
                style={{ y: parallaxOffset * -0.22 }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(236,243,255,0.18),rgba(16,28,48,0.12)_38%,rgba(7,13,24,0.04)_72%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] px-3 py-4 sm:rounded-[1.75rem] sm:px-6 sm:py-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-[14%_10%_16%] rounded-full bg-[radial-gradient(circle,rgba(243,248,255,0.26),rgba(146,172,230,0.14)_30%,transparent_68%)] blur-2xl"
                  />
                  <Image
                    src="/brand/volvo-titan-mark-mobile.png"
                    alt="Логотип Volvo Titan"
                    width={812}
                    height={785}
                    preload
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 42vw, 32rem"
                    className="relative z-[1] mx-auto h-auto w-full object-contain drop-shadow-[0_18px_34px_rgba(3,8,18,0.32)]"
                  />
                </div>
                <div className="mt-3 grid gap-2 rounded-[1.2rem] border border-white/10 bg-black/15 p-3 backdrop-blur-md sm:mt-4 sm:gap-3 sm:rounded-[1.5rem] sm:p-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Телефон</span>
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="flex max-w-[12rem] flex-col items-end gap-2.5 text-right text-white transition hover:text-[var(--chrome)] sm:max-w-[14rem]"
                    >
                      <span className="text-[0.95rem] font-semibold leading-none">
                        {CONTACT_INFO.phoneDisplay}
                      </span>
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
                        {CONTACT_INFO.phoneContactName}
                      </span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Адрес</span>
                    <span className="max-w-44 text-right text-white sm:max-w-52">
                      {CONTACT_INFO.address}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
