"use client";

import { ArrowUpRight, Gift } from "lucide-react";

import { SERVICES, type ServiceConfig } from "@/lib/constants";
import { cn } from "@/utils/cn";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ServiceCardButton } from "./service-card-button";

const CARD_CLASS =
  "glass-panel metal-border group h-full w-full rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 focus-visible:-translate-y-1 focus-visible:border-white/30 focus-visible:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)] active:scale-[0.99] sm:rounded-[1.5rem] sm:p-6";

function ServiceCardLink({ service }: { service: ServiceConfig & { landingSlug: string } }) {
  const isFree = service.badge === "free";

  return (
    <a
      href={`/${service.landingSlug}`}
      className={cn(
        "block",
        CARD_CLASS,
        isFree && "ring-1 ring-[var(--highlight)]/30 md:flex md:items-center md:justify-between md:gap-10",
      )}
    >
      <div className={isFree ? "md:max-w-xl" : undefined}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="max-w-44 text-lg font-semibold leading-6 text-white sm:max-w-52 sm:text-xl">
            {service.name}
          </h3>
          {isFree ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[0.68rem] font-semibold text-emerald-400 sm:px-3 sm:text-xs md:hidden">
              <Gift className="h-3.5 w-3.5" aria-hidden />
              {service.price}
            </span>
          ) : (
            <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[0.68rem] text-slate-300 transition group-hover:border-white/20 group-hover:text-white sm:px-3 sm:text-xs">
              {service.price}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-400 transition group-hover:text-slate-300 sm:mt-5 sm:leading-7">
          {service.description}
        </p>
      </div>
      <div
        className={cn(
          "mt-4 flex items-center justify-between sm:mt-6",
          isFree && "md:mt-0 md:shrink-0 md:flex-col md:items-end md:gap-4",
        )}
      >
        {isFree && (
          <p className="hidden items-baseline gap-3 md:flex">
            {service.originalPrice && (
              <span className="text-sm text-slate-400 line-through">{service.originalPrice}</span>
            )}
            <span className="inline-flex items-center gap-2 font-heading text-3xl text-emerald-400">
              <Gift className="h-6 w-6" aria-hidden />
              {service.price}
            </span>
          </p>
        )}
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition group-hover:text-white">
          Подробнее
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}

export function ServicesSection() {
  return (
    <section className="px-0 py-[var(--landing-section-space)] md:py-24">
      <div id="services" className="section-shell scroll-mt-[var(--landing-nav-offset)]">
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Услуги и цены"
            title="Без скрытых наценок"
            description="Все работы — по фиксированной цене до начала."
          />
          <a
            href="#lead"
            className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
          >
            Записаться на сервис
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-7 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={index * 0.05}
              className={cn("h-full", service.badge === "free" && "md:col-span-2 xl:col-span-3")}
            >
              {service.landingSlug ? (
                <ServiceCardLink service={service as ServiceConfig & { landingSlug: string }} />
              ) : (
                <ServiceCardButton
                  serviceName={service.name}
                  price={service.price}
                  badge={service.badge}
                  description={service.description}
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
