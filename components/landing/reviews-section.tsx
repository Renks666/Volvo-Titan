import { BadgeCheck, Star } from "lucide-react";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const reviews = [
  {
    name: "Андрей К.",
    model: "XC90 2018",
    date: "12 февраля 2026",
    text: "Приехал с непонятным стуком. За час нашли причину — разошёлся хомут. Других проблем не придумывали, починили быстро. Честный сервис.",
  },
  {
    name: "Марина Л.",
    model: "XC60 2020",
    date: "3 января 2026",
    text: "Обратилась первый раз, немного боялась переплатить. В итоге — только необходимое, цена совпала с озвученной до ремонта. Теперь езжу только сюда.",
  },
  {
    name: "Дмитрий В.",
    model: "V60 2017",
    date: "18 ноября 2025",
    text: "Делал предпродажную проверку перед покупкой. Мастер нашёл несколько скрытых проблем — продавец об этом молчал. Отчёт подробный, рекомендую.",
  },
  {
    name: "Сергей П.",
    model: "XC40 2021",
    date: "7 октября 2025",
    text: "ТО сделали за день. Всё объяснили, показали что меняли. Без лишних звонков с вопросом «а вот ещё вот это поменять?». Спокойный нормальный сервис.",
  },
];

export function ReviewsSection() {
  return (
    <section className="px-0 py-[var(--landing-section-space)] md:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят владельцы Volvo"
        />
        <div className="mt-7 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.08}>
              <article className="glass-panel metal-border flex h-full flex-col rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] sm:rounded-[2rem] sm:p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-6 text-slate-300 sm:leading-7">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-5 border-t border-white/8 pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-white">{review.name}</p>
                      <BadgeCheck className="h-4 w-4 shrink-0 text-[var(--highlight)]" aria-label="Подтверждённый отзыв" />
                    </div>
                    <p className="text-xs text-slate-500">{review.date}</p>
                  </div>
                  <p className="mt-1 text-xs font-medium text-slate-400">{review.model}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
