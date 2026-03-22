import { Clock3, MapPin, MessageCircleMore, Phone } from "lucide-react";

import { CONTACT_INFO } from "@/lib/constants";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ContactSection() {
  return (
    <section id="contacts" className="px-6 py-16 scroll-mt-32 md:py-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="glass-panel metal-border rounded-[2rem] p-6 md:p-8">
              <SectionHeading
                eyebrow="Контакты"
                title="Приезжайте в Volvo Titan или позвоните прямо сейчас"
                description="Если автомобиль ведет себя нестабильно, лучше записаться заранее: так мы сможем сразу заложить время под диагностику."
              />
              <div className="mt-8 grid gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-3 text-white">
                    <Phone className="h-5 w-5 text-[var(--highlight)]" />
                    <span className="font-semibold">Телефон</span>
                  </div>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="mt-3 inline-block text-lg text-slate-200 transition hover:text-white"
                  >
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-3 text-white">
                    <MapPin className="h-5 w-5 text-[var(--highlight)]" />
                    <span className="font-semibold">Адрес</span>
                  </div>
                  <p className="mt-3 text-slate-300">{CONTACT_INFO.address}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-3 text-white">
                    <Clock3 className="h-5 w-5 text-[var(--highlight)]" />
                    <span className="font-semibold">Часы работы</span>
                  </div>
                  <div className="mt-3 grid gap-2 text-slate-300">
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
            <div className="glass-panel metal-border rounded-[2rem] p-6 md:p-8">
              <SectionHeading
                eyebrow="Мессенджеры"
                title="Быстрый канал связи, если звонок неудобен"
                description="Откройте мессенджер и оставьте сообщение с моделью Volvo и симптомами. Мы вернемся с ориентиром по ремонту."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel metal-border rounded-[1.75rem] p-5 transition hover:-translate-y-0.5"
                >
                  <MessageCircleMore className="h-5 w-5 text-[var(--highlight)]" />
                  <h3 className="mt-4 text-lg font-semibold text-white">WhatsApp</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    Для быстрых фото, голосовых и уточнения деталей ремонта.
                  </p>
                </a>
                <a
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel metal-border rounded-[1.75rem] p-5 transition hover:-translate-y-0.5"
                >
                  <MessageCircleMore className="h-5 w-5 text-[var(--highlight)]" />
                  <h3 className="mt-4 text-lg font-semibold text-white">Telegram</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    Удобный резервный канал, если предпочитаете писать вместо звонка.
                  </p>
                </a>
              </div>
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-white/15 p-5 text-sm text-slate-400">
                Для production лучше заменить `NEXT_PUBLIC_TELEGRAM_CONTACT_URL` на прямую ссылку на ваш Telegram-контакт.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
