import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2, PhoneCall, ShieldCheck } from "lucide-react";

import { Footer } from "@/components/landing/footer";
import { LeadForm } from "@/components/landing/lead-form";
import { Reveal } from "@/components/landing/reveal";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { CONTACT_INFO, LANDING_NAV_ITEMS, SITE_URL, TRUST_METRICS } from "@/lib/constants";
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

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const page = LANDING_PAGES[slug];
  if (!page) notFound();

  return (
    <>
      <SiteNavbar items={LANDING_NAV_ITEMS} />
      <main id="top" className="relative overflow-hidden">

        {/* Hero + Form */}
        <section className="px-0 pb-[var(--landing-section-space)] pt-[calc(var(--landing-nav-offset)+1rem)] md:pb-20 md:pt-36">
          <div className="section-shell">
            <div className="glass-panel metal-border grid gap-6 rounded-[var(--landing-card-radius)] px-[var(--landing-card-padding-lg)] py-[var(--landing-card-padding-lg)] sm:rounded-[2rem] sm:px-6 sm:py-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:px-10 md:py-12">

              {/* Left: headline */}
              <div className="flex flex-col justify-center">
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
                <div className="mt-5 hidden items-center gap-2 sm:flex">
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

              {/* Right: form */}
              <div
                id="lead"
                className="scroll-mt-[var(--landing-nav-offset)] rounded-[1.25rem] border border-white/10 bg-black/20 p-4 sm:rounded-[1.75rem] sm:p-5 md:p-6"
              >
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Записаться онлайн
                </p>
                <LeadForm defaultService={page.service} />
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="px-0 pb-[var(--landing-section-space)] md:pb-16">
          <div className="section-shell">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {TRUST_METRICS.map((m) => (
                <div
                  key={m.label}
                  className="glass-panel metal-border rounded-[1.4rem] p-4 text-center sm:rounded-[1.75rem] sm:p-5"
                >
                  <p className="font-heading text-xl text-[var(--highlight)] sm:text-2xl">{m.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="px-0 py-[var(--landing-section-space)] md:py-20">
          <div className="section-shell">
            <Reveal>
              <div className="glass-panel metal-border rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] sm:rounded-[2rem] sm:p-8 md:p-10">
                <h2 className="font-heading text-2xl text-white sm:text-3xl">{page.details.heading}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                  {page.details.description}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {page.details.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--highlight)]" />
                      <span className="text-sm leading-6 text-slate-300">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#lead"
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--highlight)] px-6 py-3 text-sm font-semibold text-[#050913] transition hover:bg-[var(--highlight)]/90"
                  >
                    Записаться онлайн →
                  </a>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.08]"
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
    </>
  );
}
