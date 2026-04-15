import { ArrowRight, Clock, ShieldCheck, Wrench } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const mechanicPoints = [
  {
    icon: Wrench,
    title: "Только Volvo",
    text: "Специализация на одной марке — без универсального поточного сервиса. Глубокое знание каждой модели XC, S и V серий.",
  },
  {
    icon: Clock,
    title: "Опыт с 1995 года",
    text: "Понятное объяснение причин ремонта без лишних работ. Мастера читают машину без долгих экспериментов.",
  },
  {
    icon: ShieldCheck,
    title: "Человеческий подход",
    text: "Сначала разбираемся в симптомах, потом предлагаем решение. Без давления и навязывания.",
  },
] as const;

export function MechanicSection() {
  return (
    <section className="px-0 py-[var(--landing-section-space)] md:py-24">
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel metal-border grid gap-8 overflow-hidden rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] sm:rounded-[2rem] sm:p-6 lg:grid-cols-2 lg:items-start lg:gap-16 lg:p-8 xl:p-10">
            {/* 1. Заголовок — всегда первый */}
            <div className="lg:col-start-1 lg:row-start-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-300 sm:px-4 sm:text-xs sm:tracking-[0.24em]">
                <Wrench className="h-4 w-4 text-[var(--highlight)]" />
                Живой сервисный подход
              </div>

              <div className="mt-4 sm:mt-5">
                <SectionHeading
                  eyebrow="Команда"
                  title={
                    <>
                      Вашим{" "}
                      <span className="font-heading uppercase tracking-[0.08em] text-[var(--chrome)]">
                        Volvo
                      </span>{" "}
                      занимаются люди, а не поток
                    </>
                  }
                  description="Мастера знают Volvo глубоко — поэтому диагностика точная, а ремонт понятен до начала работ."
                />
              </div>
            </div>

            {/* 2. Фото — второй на mobile, правая колонка (row 1–2) на desktop */}
            <div className="flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="glass-panel metal-border relative mx-auto max-w-sm overflow-hidden rounded-[1.5rem] sm:max-w-md sm:rounded-[2rem]">
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                <Image
                  src="/brand/mechanic-volvo-titan.png"
                  alt="Мастер Volvo Titan"
                  width={600}
                  height={700}
                  sizes="(max-width: 640px) 80vw, (max-width: 1280px) 45vw, 36rem"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            {/* 3. Карточки + CTA — третий на mobile, вторая строка слева на desktop */}
            <div className="lg:col-start-1 lg:row-start-2">
              <div className="grid gap-3 sm:gap-4">
                {mechanicPoints.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4 sm:rounded-[1.35rem] sm:p-5"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--highlight)]/20 bg-[var(--highlight)]/10">
                        <Icon className="h-4 w-4 text-[var(--highlight)]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white sm:text-base">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <a href="#lead">
                  <Button className="w-full sm:w-auto">
                    Записаться — это бесплатно
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
