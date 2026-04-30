"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { trackCtaEvent } from "@/utils/analytics";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const faqs = [
  {
    question: "Вы используете оригинальные запчасти или аналоги?",
    answer:
      "Работаем с оригинальными запчастями и проверенными аналогами. Всё согласовываем с вами до начала работ — вы выбираете вариант, мы объясняем разницу. Никаких сюрпризов при выдаче.",
  },
  {
    question: "Можно приехать без записи?",
    answer:
      "Рекомендуем записываться заранее: принимаем в течение 1 рабочего дня после звонка или заявки. Запись занимает 2 минуты — и вы получаете точное время без ожидания.",
  },
  {
    question: "Сколько стоит ТО для XC90 или XC60?",
    answer:
      "Зависит от пробега, модели и перечня работ по регламенту. Базовое ТО — от 3 000 ₽. Точную стоимость назовём после уточнения деталей — позвоните или оставьте заявку.",
  },
  {
    question: "Даёте ли гарантию на запчасти, а не только на работу?",
    answer:
      "Да. На выполненные работы — письменная гарантия. На запчасти действует гарантия производителя. После ремонта остаёмся на связи: если возникнут вопросы — разберёмся.",
  },
  {
    question: "Вы работаете с Volvo, которые ещё на гарантии?",
    answer:
      "Гарантийный ремонт — только у официального дилера, это закреплено законодательно. Мы специализируемся на постгарантийном обслуживании и ремонте — именно здесь наша экспертиза.",
  },
  {
    question: "Сколько занимает диагностика?",
    answer:
      "Компьютерная диагностика всех блоков управления — 30–40 минут. Можно подождать в сервисе или оставить машину. Результат объясним простым языком, без технического жаргона.",
  },
  {
    question: "Можно оставить машину на несколько дней?",
    answer:
      "Да, принимаем автомобили на многодневный ремонт. Уточним сроки при записи — зависит от объёма работ и наличия запчастей. Держим вас в курсе на каждом этапе.",
  },
] as const;

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-panel metal-border overflow-hidden rounded-[var(--landing-card-radius)] sm:rounded-[1.5rem]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white transition-colors hover:text-[var(--highlight)] sm:px-6 sm:py-5 sm:text-base"
        onClick={() => {
          if (!open) trackCtaEvent("faq_open", { question });
          setOpen((prev) => !prev);
        }}
        aria-expanded={open}
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <p className="border-t border-white/8 px-5 pb-5 pt-4 text-sm leading-6 text-slate-400 sm:px-6 sm:pb-6 sm:leading-7">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-[var(--landing-nav-offset)] px-0 py-[var(--landing-section-space)] md:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow="Вопросы и ответы"
          title="Отвечаем на частые вопросы"
          description="Если не нашли ответ — позвоните или напишите, разберёмся."
        />
        <div className="mt-7 grid gap-2 sm:mt-10 sm:gap-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <FaqItem question={faq.question} answer={faq.answer} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
