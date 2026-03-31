import { Clock3, ExternalLink, MapPin, Phone } from "lucide-react";

import { CONTACT_INFO } from "@/lib/constants";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const MESSENGER_ITEMS = [
  {
    title: "WhatsApp",
    href: CONTACT_INFO.whatsappUrl,
    iconSrc: "/icons/whatsapp.svg",
    meta: "Открыть чат",
    type: "link" as const,
  },
  {
    title: "Telegram",
    href: CONTACT_INFO.telegramUrl,
    iconSrc: "/icons/telegram.svg",
    meta: "Написать",
    type: "link" as const,
  },
  {
    title: "MAX",
    value: CONTACT_INFO.phoneDisplay,
    iconSrc: "/icons/max.svg",
    meta: "По номеру",
    type: "static" as const,
  },
] as const;

export function ContactSection() {
  return (
    <section
      id="contacts"
      className="px-0 py-[var(--landing-section-space)] scroll-mt-[var(--landing-nav-offset)] md:py-24"
    >
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel metal-border rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] sm:rounded-[2rem] sm:p-5 md:p-6">
            <SectionHeading
              eyebrow="Контакты"
              title={
                <>
                  Свяжитесь с{" "}
                  <span className="font-heading uppercase tracking-[0.08em] text-[var(--chrome)]">
                    Volvo Titan
                  </span>{" "}
                  удобным способом
                </>
              }
              description="Звоните, пишите в мессенджеры или приезжайте сразу в сервис."
            />

            {/* Asymmetric 2-column layout */}
            <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-3.5 md:grid-cols-[3fr_2fr] md:items-stretch">

              {/* LEFT: Hero phone card */}
              <div className="flex flex-col rounded-[1.35rem] border border-[var(--highlight)]/25 bg-black/25 p-4 ring-1 ring-[var(--highlight)]/10 sm:p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {CONTACT_INFO.phoneContactName}
                </p>

                <a
                  href={CONTACT_INFO.phoneHref}
                  className="mt-1.5 block font-heading text-[1.7rem] leading-none tracking-[0.04em] text-[var(--chrome)] transition hover:text-white sm:text-[2rem] lg:text-[2.2rem]"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>

                <a
                  href={CONTACT_INFO.phoneHref}
                  className="cta-shimmer mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--highlight)] py-3 text-sm font-bold text-white transition sm:py-3.5 sm:text-base"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  Позвонить
                </a>

                {/* Messenger pills */}
                <div className="mt-3 grid gap-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                  {MESSENGER_ITEMS.map((item) =>
                    item.type === "link" ? (
                      <a
                        key={item.title}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2.5 rounded-[0.95rem] border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-slate-200 transition hover:border-[var(--highlight)]/40 hover:bg-white/[0.07] hover:text-white"
                      >
                        <img
                          src={item.iconSrc}
                          alt=""
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 object-contain"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-none text-white">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[0.62rem] uppercase tracking-[0.14em] text-slate-400">
                            {item.meta}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div
                        key={item.title}
                        className="flex items-center gap-2.5 rounded-[0.95rem] border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-slate-200"
                      >
                        <img
                          src={item.iconSrc}
                          alt=""
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 object-contain"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-none text-white">
                            {item.title}
                          </p>
                          <p className="mt-0.5 break-words text-[0.72rem] leading-5 text-slate-300">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* RIGHT: Address + Hours stacked */}
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-3.5 md:grid-cols-1">

                {/* Address card */}
                <div className="flex flex-col rounded-[1.35rem] border border-white/10 bg-black/20 p-4 sm:p-5">
                  <div className="flex items-center gap-2.5 text-white">
                    <MapPin className="h-4.5 w-4.5 shrink-0 text-[var(--highlight)]" />
                    <span className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-300">
                      Адрес
                    </span>
                  </div>
                  <p className="mt-2.5 grow text-sm leading-[1.65] text-slate-200 sm:text-[0.94rem]">
                    {CONTACT_INFO.address}
                  </p>
                  <a
                    href={CONTACT_INFO.mapOpenUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[var(--highlight)] transition hover:text-white"
                  >
                    Открыть на карте
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Working hours card */}
                <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4 sm:p-5">
                  <div className="flex items-center gap-2.5 text-white">
                    <Clock3 className="h-4.5 w-4.5 shrink-0 text-[var(--highlight)]" />
                    <span className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-300">
                      Часы работы
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2.5">
                    {CONTACT_INFO.workHours.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-3 text-sm text-slate-300 sm:text-[0.94rem]"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[0.55rem] text-[var(--highlight)]">●</span>
                          {item.label}
                        </span>
                        <span className="font-semibold text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
