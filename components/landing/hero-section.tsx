"use client";

import {
  ArrowRight,
  Clock3,
  PhoneCall,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";
import { CONTACT_INFO } from "@/lib/constants";
import { trackCtaEvent } from "@/utils/analytics";

const heroHighlights = [
  {
    icon: Clock3,
    text: "Минимальная очередь",
  },
  {
    icon: ShieldCheck,
    text: "Гарантия на работы",
  },
  {
    icon: SearchCheck,
    text: "Диагностика без навязывания",
  },
] as const;

export function HeroSection() {
  const parallaxOffset = useParallax(0.16);

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-6 pb-20 pt-28 scroll-mt-32 md:pb-28 md:pt-32"
    >
      <div className="section-shell">
        <div className="glass-panel metal-border relative overflow-hidden rounded-[2rem] px-6 py-8 md:px-10 md:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(191,214,255,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(73,116,225,0.2),transparent_28%)]" />
          <motion.div
            aria-hidden
            className="absolute -right-14 top-10 hidden h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(238,244,255,0.32),rgba(255,255,255,0.02)_65%,transparent_75%)] blur-xl md:block"
            style={{ y: parallaxOffset * -0.35 }}
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-300">
                <ShieldCheck className="h-4 w-4 text-[var(--highlight)]" />
                Специализированный сервис Volvo
              </div>
              <h1 className="mt-6 max-w-3xl font-heading text-4xl leading-tight text-white md:text-6xl">
                <span className="mr-3 inline-block">Ремонт</span>
                <span
                  className="inline-block align-baseline text-[1em] font-bold leading-none tracking-[0.05em] text-[#1f4698] md:text-[1.04em]"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  VOLVO
                </span>
                <br className="hidden sm:block" />
                <span className="block h-2 sm:hidden" aria-hidden />
                в Москве
              </h1>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.28em] text-slate-400 md:text-base">
                Работаем с 1995 года
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                {CONTACT_INFO.heroSubtitle} Принимаем быстро, объясняем по делу и держим фокус
                на надежности, а не на продаже ненужных работ.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() => trackCtaEvent("phone_click", { location: "hero" })}
                >
                  <Button className="w-full sm:w-auto">
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Позвонить
                  </Button>
                </a>
                <a
                  href="#lead-form"
                  onClick={() => trackCtaEvent("lead_cta_click", { location: "hero" })}
                >
                  <Button className="w-full sm:w-auto" variant="secondary">
                    Записаться
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-2.5 lg:flex-nowrap">
                {heroHighlights.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-xs text-slate-200 backdrop-blur-sm sm:text-sm"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <Icon className="h-3.5 w-3.5 text-[var(--highlight)]" />
                    </div>
                    <span className="whitespace-nowrap font-medium leading-none">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <motion.div
                className="glass-panel metal-border relative mx-auto max-w-md overflow-hidden rounded-[2rem] p-5"
                style={{ y: parallaxOffset * -0.22 }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(236,243,255,0.18),rgba(16,28,48,0.12)_38%,rgba(7,13,24,0.04)_72%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] px-4 py-6 sm:px-6 sm:py-7">
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
                <div className="mt-4 grid gap-3 rounded-[1.5rem] border border-white/10 bg-black/15 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Телефон</span>
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="text-white transition hover:text-[var(--chrome)]"
                    >
                      {CONTACT_INFO.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Адрес</span>
                    <span className="max-w-52 text-right text-white">
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
