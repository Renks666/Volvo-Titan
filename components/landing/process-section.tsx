import { ArrowRight } from "lucide-react";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    number: "01",
    title: "Оставьте заявку",
    description: "Онлайн или по телефону — 2 минуты",
  },
  {
    number: "02",
    title: "Мы перезвоним",
    description: "Уточним задачу и запишем на удобное время",
  },
  {
    number: "03",
    title: "Диагностика",
    description: "Осмотр и считывание ошибок — бесплатно",
  },
  {
    number: "04",
    title: "Согласование",
    description: "Называем полную стоимость. Вы решаете",
  },
  {
    number: "05",
    title: "Ремонт и выдача",
    description: "Объясняем что сделали. Выдаём гарантию",
  },
];

export function ProcessSection() {
  return (
    <section className="px-0 py-[var(--landing-section-space)] md:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Как это работает"
          title="Как это работает — 5 шагов"
          description="Прозрачный процесс от первого звонка до выдачи автомобиля."
        />
        <div className="mt-7 sm:mt-10">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.07}>
                <div className="relative flex h-full flex-col">
                  <div className="glass-panel metal-border flex h-full flex-col rounded-[var(--landing-card-radius)] p-5 sm:rounded-[2rem] sm:p-6">
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
      </div>
    </section>
  );
}
