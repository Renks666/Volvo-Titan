"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

import { FAQS } from "@/lib/constants";
import { trackCtaEvent } from "@/utils/analytics";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";


function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <div className="glass-panel metal-border overflow-hidden rounded-[var(--landing-card-radius)] sm:rounded-[1.5rem]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white transition-colors hover:text-[var(--highlight)] sm:px-6 sm:py-5 sm:text-base"
        onClick={() => {
          if (!open) trackCtaEvent("faq_open", { question });
          setOpen((prev) => !prev);
        }}
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-white/8 px-5 pb-5 pt-4 text-sm leading-6 text-slate-400 sm:px-6 sm:pb-6 sm:leading-7">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="px-0 py-[var(--landing-section-space)] md:py-24">
      <div id="faq" className="section-shell scroll-mt-[var(--landing-nav-offset)]">
        <SectionHeading
          eyebrow="Вопросы и ответы"
          title="Отвечаем на частые вопросы"
          description="Если не нашли ответ — позвоните или напишите, разберёмся."
        />
        <div className="mt-7 grid gap-2 sm:mt-10 sm:gap-3">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <FaqItem question={faq.question} answer={faq.answer} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
