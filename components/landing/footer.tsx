import { CONTACT_INFO, NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-7 md:grid-cols-3 md:gap-6 lg:gap-10">

          {/* Brand column */}
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[var(--highlight)]">
              с 1995 года
            </p>
            <p className="mt-1 font-heading text-lg uppercase tracking-[0.1em] text-[var(--chrome)] sm:text-xl">
              Volvo Titan
            </p>
            <p className="mt-2 max-w-[22ch] text-sm leading-[1.6] text-slate-400">
              Специализированный сервис Volvo в Москве. Узкая специализация, честная диагностика.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Навигация
            </p>
            <nav className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1 md:gap-y-1.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Контакты
            </p>
            <div className="mt-2.5 space-y-2.5">
              <a
                href={CONTACT_INFO.phoneHref}
                className="group block transition"
              >
                <span className="block text-[0.96rem] font-semibold leading-none text-slate-200 transition group-hover:text-white">
                  {CONTACT_INFO.phoneDisplay}
                </span>
                <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {CONTACT_INFO.phoneContactName}
                </span>
              </a>

              <p className="text-sm leading-[1.6] text-slate-400">
                {CONTACT_INFO.address}
              </p>

              {/* Messenger icon buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <img
                    src="/icons/whatsapp.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4 object-contain"
                  />
                </a>
                <a
                  href={CONTACT_INFO.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <img
                    src="/icons/telegram.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4 object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-[0.72rem] text-slate-500">
            © 2026 Volvo Titan. Все права защищены.
          </p>
          <p className="text-[0.72rem] text-slate-600">
            {CONTACT_INFO.workHours.map((h, i) => (
              <span key={h.label}>
                {i > 0 && " · "}
                {h.label} {h.value}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
