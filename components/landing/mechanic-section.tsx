import { ArrowRight, Wrench } from "lucide-react";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

import { Button } from "@/components/ui/button";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const mechanicImagePublicSrc = "/brand/mechanic-volvo-titan.png";
const mechanicImagePublicPath = path.join(
  process.cwd(),
  "public",
  "brand",
  "mechanic-volvo-titan.png",
);

const mechanicPoints = [
  "Специализация только на Volvo, без универсального поточного сервиса.",
  "Опыт с 1995 года и понятное объяснение причин ремонта без лишних работ.",
  "Прием с человеческим контактом: сначала разбираемся в симптомах, потом предлагаем решение.",
] as const;

export function MechanicSection() {
  const hasMechanicImage = existsSync(mechanicImagePublicPath);

  return (
    <section className="px-0 py-[var(--landing-section-space)] md:py-24">
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel metal-border grid gap-5 overflow-hidden rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] sm:gap-8 sm:rounded-[2rem] sm:p-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:p-8 xl:p-10">
            <div className="order-2 lg:order-1">
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
                  description="Мы строим сервис вокруг мастеров, которые знают марку глубоко и разговаривают с владельцем по делу. Поэтому диагностика получается точной, а ремонт — понятным еще до начала работ."
                />
              </div>

              <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4">
                {mechanicPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300 sm:rounded-[1.35rem] sm:p-5 sm:text-base sm:leading-7"
                  >
                    {point}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center">
                <a href="#lead">
                  <Button className="w-full sm:w-auto">
                    Записаться на диагностику
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              {hasMechanicImage ? (
                <>
                  <div className="relative mx-auto w-full max-w-[21rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)),linear-gradient(180deg,rgba(9,17,29,0.92),rgba(6,12,22,0.9))] shadow-[0_22px_60px_rgba(0,0,0,0.26)] sm:hidden">
                    <div className="relative aspect-[4/5] max-h-[26rem]">
                      <Image
                        src={mechanicImagePublicSrc}
                        alt="Механик Volvo Titan в сервисной зоне"
                        fill
                        sizes="(max-width: 640px) min(84vw, 21rem), 21rem"
                        className="object-cover object-center object-top"
                      />
                    </div>
                  </div>

                  <div className="relative mx-auto hidden w-full max-w-[30rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)),linear-gradient(180deg,rgba(9,17,29,0.92),rgba(6,12,22,0.9))] shadow-[0_30px_70px_rgba(0,0,0,0.3)] sm:block lg:max-w-[28rem] xl:max-w-[30rem]">
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                    <div className="relative aspect-[5/6] max-h-[40rem] md:aspect-[4/5]">
                      <Image
                        src={mechanicImagePublicSrc}
                        alt="Механик Volvo Titan в сервисной зоне"
                        fill
                        sizes="(max-width: 640px) 0px, (max-width: 1024px) min(70vw, 30rem), (max-width: 1280px) min(38vw, 28rem), 30rem"
                        className="object-cover object-center object-top"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative overflow-hidden rounded-[1.35rem] border border-dashed border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01)),linear-gradient(180deg,rgba(10,18,32,0.94),rgba(6,12,22,0.92))] p-5 sm:rounded-[1.75rem] sm:p-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-[12%_14%_auto] h-32 rounded-full bg-[radial-gradient(circle,rgba(126,164,255,0.18),transparent_72%)] blur-2xl"
                  />
                  <div className="relative flex min-h-[23rem] flex-col justify-between sm:min-h-[30rem]">
                    <div className="max-w-[18rem] rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-300 sm:text-xs">
                      Место под фото механика
                    </div>
                    <div>
                      <h3 className="max-w-[12ch] font-heading text-[1.9rem] leading-[1.04] text-white sm:text-[2.4rem]">
                        Секция уже готова к реальному фото
                      </h3>
                      <p className="mt-3 max-w-[28rem] text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                        Добавьте файл <span className="font-semibold text-slate-200">`public/brand/mechanic-volvo-titan.png`</span>,
                        и блок автоматически начнет показывать фото с мобильным и десктопным кадрированием.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
