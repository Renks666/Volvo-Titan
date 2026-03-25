import { Clock3, MapPin, Phone } from "lucide-react";

import { CONTACT_INFO } from "@/lib/constants";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ContactSection() {
  return (
    <section
      id="contacts"
      className="px-0 py-[var(--landing-section-space)] scroll-mt-[var(--landing-nav-offset)] md:py-24"
    >
      <div className="section-shell">
        <div className="grid gap-4 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="glass-panel metal-border rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] sm:rounded-[2rem] sm:p-6 md:p-8">
              <SectionHeading
                eyebrow="Контакты"
                title={
                  <>
                    Приезжайте в{" "}
                    <span className="font-heading uppercase tracking-[0.08em] text-[var(--chrome)]">
                      Volvo Titan
                    </span>{" "}
                    или позвоните прямо сейчас
                  </>
                }
                description="Если автомобиль ведет себя нестабильно, лучше записаться заранее: так мы сразу заложим время под диагностику."
              />
              <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
                <div className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4 sm:rounded-[1.5rem] sm:p-5">
                  <div className="flex items-center gap-3 text-white">
                    <Phone className="h-5 w-5 text-[var(--highlight)]" />
                    <span className="font-semibold">Телефон</span>
                  </div>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="mt-3 inline-flex max-w-full flex-col gap-2.5 text-base text-slate-200 transition hover:text-white sm:mt-4 sm:text-lg"
                  >
                    <span className="break-words text-[1.02rem] font-semibold leading-none text-white sm:text-[1.12rem]">
                      {CONTACT_INFO.phoneDisplay}
                    </span>
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-300 sm:text-[0.68rem]">
                      {CONTACT_INFO.phoneContactName}
                    </span>
                  </a>
                </div>
                <div className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4 sm:rounded-[1.5rem] sm:p-5">
                  <div className="flex items-center gap-3 text-white">
                    <MapPin className="h-5 w-5 text-[var(--highlight)]" />
                    <span className="font-semibold">Адрес</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300 sm:mt-3 sm:text-base">
                    {CONTACT_INFO.address}
                  </p>
                </div>
                <div className="rounded-[1.15rem] border border-white/10 bg-black/20 p-4 sm:rounded-[1.5rem] sm:p-5">
                  <div className="flex items-center gap-3 text-white">
                    <Clock3 className="h-5 w-5 text-[var(--highlight)]" />
                    <span className="font-semibold">Часы работы</span>
                  </div>
                  <div className="mt-2 grid gap-2 text-sm text-slate-300 sm:mt-3 sm:text-base">
                    {CONTACT_INFO.workHours.map((item) => (
                      <div key={item.label} className="flex justify-between gap-3">
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glass-panel metal-border rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] sm:rounded-[2rem] sm:p-6 md:p-8">
              <SectionHeading
                eyebrow="Мессенджеры"
                title="Быстрый канал связи, если звонок неудобен"
                description="Откройте мессенджер и оставьте сообщение с моделью Volvo и симптомами. Мы вернемся с ориентиром по ремонту."
              />
              <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel metal-border rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 sm:rounded-[1.75rem] sm:p-5"
                >
                  <img
                    src="/icons/whatsapp.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 object-contain"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-white">WhatsApp</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400 sm:leading-7">
                    Для быстрых фото, голосовых и уточнения деталей ремонта.
                  </p>
                </a>
                <a
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel metal-border rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 sm:rounded-[1.75rem] sm:p-5"
                >
                  <img
                    src="/icons/telegram.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 object-contain"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-white">Telegram</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400 sm:leading-7">
                    Удобный резервный канал, если предпочитаете писать вместо звонка.
                  </p>
                </a>
                <a
                  href={CONTACT_INFO.maxUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel metal-border rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 sm:rounded-[1.75rem] sm:p-5"
                >
                  <img
                    src="/icons/max.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 object-contain"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-white">MAX</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400 sm:leading-7">
                    Можно написать на тот же контакт {CONTACT_INFO.phoneDisplay}, если вам удобнее
                    MAX.
                  </p>
                </a>
              </div>
              <div className="mt-6 rounded-[1.25rem] border border-dashed border-white/15 p-4 text-sm leading-6 text-slate-400 sm:mt-8 sm:rounded-[1.75rem] sm:p-5">
                Для production лучше заменить `NEXT_PUBLIC_TELEGRAM_CONTACT_URL` на прямую ссылку
                на ваш Telegram-контакт.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
