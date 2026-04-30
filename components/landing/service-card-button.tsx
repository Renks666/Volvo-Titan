"use client";

import { ArrowUpRight } from "lucide-react";

const CARD_CLASS =
  "glass-panel metal-border group h-full w-full rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 focus-visible:-translate-y-1 focus-visible:border-white/30 focus-visible:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)] active:scale-[0.99] sm:rounded-[2rem] sm:p-6";

function scrollToLead() {
  const target = document.getElementById("lead")?.querySelector<HTMLElement>(".section-shell");
  if (!target) return;
  const offset = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--landing-nav-offset"),
  );
  const scrollOffset = Number.isFinite(offset) ? offset : 0;
  const top = Math.max(window.scrollY + target.getBoundingClientRect().top - scrollOffset, 0);
  window.history.pushState(null, "", "#lead");
  window.scrollTo({ top, behavior: "smooth" });
}

interface Props {
  serviceName: string;
  price: string;
  badge?: "free";
  description: string;
}

export function ServiceCardButton({ serviceName, price, badge, description }: Props) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("lead-service:selected", { detail: { serviceName } }));
    scrollToLead();
  };

  return (
    <button
      type="button"
      className={CARD_CLASS}
      onClick={handleClick}
      aria-label={`${serviceName} - перейти к форме заявки`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="max-w-44 text-lg font-semibold leading-6 text-white sm:max-w-52 sm:text-xl">
          {serviceName}
        </h3>
        {badge === "free" ? (
          <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[0.68rem] font-semibold text-emerald-400 sm:px-3 sm:text-xs">
            {price}
          </span>
        ) : price === "по запросу" ? (
          <span
            className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[0.68rem] text-slate-400 transition group-hover:border-white/20 group-hover:text-slate-300 sm:px-3 sm:text-xs"
            title="Цена зависит от модели — уточним при звонке"
          >
            уточним при звонке
          </span>
        ) : (
          <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[0.68rem] text-slate-300 transition group-hover:border-white/20 group-hover:text-white sm:px-3 sm:text-xs">
            {price}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400 transition group-hover:text-slate-300 sm:mt-5 sm:leading-7">
        {description}
      </p>
      <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition group-hover:text-white sm:mt-6">
        Оставить заявку
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </button>
  );
}
