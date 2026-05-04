import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Award, CheckCircle2, Clock, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";

import { Footer } from "@/components/landing/footer";
import { LeadForm } from "@/components/landing/lead-form";
import { Reveal } from "@/components/landing/reveal";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { StickyCtaBar } from "@/components/landing/sticky-cta-bar";
import { CONTACT_INFO, LANDING_NAV_ITEMS, SITE_URL } from "@/lib/constants";
import { LANDING_PAGES } from "@/lib/landing-pages";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(LANDING_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = LANDING_PAGES[slug];
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `${SITE_URL}/${slug}` },
  };
}

const WHY_US = [
  {
    icon: Clock,
    title: "30 лет только Volvo",
    text: "Узкая специализация — знаем каждую модель XC, S и V серий и типичные проблемы наизусть.",
  },
  {
    icon: ShieldCheck,
    title: "Цена до начала работ",
    text: "Называем полную стоимость прежде чем взяться за инструмент. Никаких доплат при выдаче.",
  },
  {
    icon: Award,
    title: "Гарантия на всё",
    text: "Письменная гарантия на каждый выполненный ремонт. Остаёмся на связи после сдачи.",
  },
] as const;

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const page = LANDING_PAGES[slug];
  if (!page) notFound();

  const ctaHeading = page.cta?.heading ?? "Не откладывайте";
  const ctaSubtext =
    page.cta?.subtext ?? "Принимаем по записи — без очередей. Перезвоним в течение 15 минут.";

  return (
    <>
      <SiteNavbar items={LANDING_NAV_ITEMS} />

      <div aria-hidden style={{ height: "144px" }} />

      <main id="top" className="relative overflow-hidden">

        {/* ── Hero + Details + Form (one unified panel) ── */}
        <section id="hero" className="px-0 pb-[var(--landing-section-space)] md:pb-20">
          <div className="section-shell">
            <Reveal>
              <div className="glass-panel metal-border rounded-[var(--landing-card-radius)] sm:rounded-[2rem] md:grid md:grid-cols-[1.15fr_0.85fr]">

                {/* Left — hero text */}
                <div className="flex flex-col px-5 pb-5 pt-12 sm:px-7 sm:pb-7 sm:pt-14 md:px-10 md:pb-10 md:pt-16">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-slate-300 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.25em]">
                    <ShieldCheck className="h-4 w-4 text-[var(--highlight)]" />
                    {page.hero.eyebrow}
                  </div>

                  <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.05] text-white sm:mt-5 sm:text-5xl md:mt-6 md:text-6xl">
                    {page.hero.title}
                  </h1>

                  <p className="mt-4 max-w-[38rem] text-[0.98rem] leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
                    {page.hero.subtitle}
                  </p>

                  <div className="mt-5 inline-flex w-fit items-center gap-3 rounded-xl border border-[var(--highlight)]/20 bg-[var(--highlight)]/5 px-4 py-2.5">
                    <span className="text-sm text-slate-400">{page.hero.priceLabel}:</span>
                    <span className="text-lg font-bold text-[var(--highlight)]">{page.hero.price}</span>
                  </div>

                  <div className="mt-4 hidden items-center gap-2 sm:flex">
                    <PhoneCall className="h-4 w-4 text-slate-500" />
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="text-sm font-semibold text-slate-300 transition hover:text-white"
                    >
                      {CONTACT_INFO.phoneDisplay}
                    </a>
                    <span className="text-slate-600">·</span>
                    <span className="text-sm text-slate-500">{CONTACT_INFO.phoneContactName}</span>
                  </div>
                </div>

                {/* Right — service details */}
                <div className="border-t border-white/10 px-5 py-8 sm:px-7 sm:py-10 md:border-l md:border-t-0 md:px-10 md:py-16">
                  <h2 className="font-heading text-xl text-white sm:text-2xl">
                    {page.details.heading}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-400 sm:leading-8">
                    {page.details.description}
                  </p>

                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-1">
                    {page.details.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--highlight)]" />
                        <span className="text-sm leading-6 text-slate-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom — lead form (spans both columns) */}
                <div
                  id="lead"
                  className="scroll-mt-28 border-t border-white/10 px-5 py-8 sm:px-8 sm:py-10 md:col-span-2 md:scroll-mt-36 md:grid md:grid-cols-[1fr_1.4fr] md:gap-10 md:px-12 md:py-12"
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Записаться онлайн
                    </p>
                    <p className="mt-3 font-heading text-2xl text-white sm:text-3xl">
                      {page.formHeading}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      Перезвоним в течение 15 минут и согласуем удобное время.
                    </p>
                    <div className="mt-5 hidden flex-col gap-3 md:flex">
                      <a
                        href={CONTACT_INFO.phoneHref}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
                      >
                        <PhoneCall className="h-4 w-4 text-slate-500" />
                        {CONTACT_INFO.phoneDisplay}
                      </a>
                      <div className="flex gap-3">
                        <a
                          href={CONTACT_INFO.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          WhatsApp
                        </a>
                        <a
                          href={CONTACT_INFO.telegramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Telegram
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <LeadForm defaultService={page.service} />
                  </div>
                </div>

              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Why Volvo Titan ─────────────────────────────────── */}
        <section className="px-0 pb-[var(--landing-section-space)] md:pb-20">
          <div className="section-shell">
            <Reveal>
              <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                {WHY_US.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="glass-panel metal-border rounded-[var(--landing-card-radius)] p-5 sm:rounded-2xl sm:p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--highlight)]/10">
                      <Icon className="h-5 w-5 text-[var(--highlight)]" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1.5 text-sm leading-6 text-slate-400">{text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────── */}
        <section className="px-0 pb-16 md:pb-24">
          <div className="section-shell">
            <Reveal>
              <div className="flex flex-col items-center rounded-[var(--landing-card-radius)] border border-white/10 bg-white/[0.03] px-6 py-12 text-center sm:rounded-[2rem] sm:py-16">
                <p className="font-heading text-2xl text-white sm:text-3xl md:text-4xl">
                  {ctaHeading}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400 sm:text-base">
                  {ctaSubtext}
                </p>
                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
                  <a
                    href="#lead"
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--highlight)] px-8 py-3.5 text-sm font-semibold text-[#050913] transition hover:opacity-90"
                  >
                    Записаться онлайн →
                  </a>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
                  >
                    <PhoneCall className="h-4 w-4" />
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
      <StickyCtaBar />
    </>
  );
}
