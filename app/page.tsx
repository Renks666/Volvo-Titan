import type { Metadata } from "next";

import { BenefitsSection } from "@/components/landing/benefits-section";
import { FaqSection } from "@/components/landing/faq-section";
import { ContactSection } from "@/components/landing/contact-section";
import { CtaSection } from "@/components/landing/cta-section";
import { DiagnosticsOffer } from "@/components/landing/diagnostics-offer";
import { GallerySection } from "@/components/landing/gallery-section";
import { HeroSection } from "@/components/landing/hero-section";
import { MapSection } from "@/components/landing/map-section";
import { MechanicSection } from "@/components/landing/mechanic-section";
import { ProcessSection } from "@/components/landing/process-section";
import { ReviewsSection } from "@/components/landing/reviews-section";
import { ServicesSection } from "@/components/landing/services-section";
import { WorksSection } from "@/components/landing/works-section";
import { Footer } from "@/components/landing/footer";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { StickyCtaBar } from "@/components/landing/sticky-cta-bar";
import { SectionVisibilityTracker } from "@/components/landing/section-visibility-tracker";
import { TrustStrip } from "@/components/landing/trust-strip";
import { CONTACT_INFO, SITE_URL } from "@/lib/constants";
import { createLocalBusinessSchema } from "@/lib/metadata";

function FinalCta() {
  return (
    <section className="px-0 py-[var(--landing-section-space)] md:py-12">
      <div className="section-shell">
        <div className="glass-panel metal-border rounded-[var(--landing-card-radius)] px-[var(--landing-card-padding-lg)] py-10 text-center sm:rounded-[2rem] sm:px-10 sm:py-14">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--highlight)] sm:text-xs">
            Первый шаг — бесплатно
          </p>
          <h2 className="mx-auto mt-3 max-w-xl font-heading text-2xl leading-tight text-white sm:text-3xl">
            Всё ещё думаете?
            <br />
            Диагностика ничего не будет стоить
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400 sm:mt-5 sm:text-base sm:leading-7">
            Ранний ремонт всегда дешевле запущенной проблемы. Запишитесь — первый осмотр за наш счёт.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <a
              href="#lead"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--highlight)] px-7 py-3.5 text-sm font-semibold text-[#050913] transition hover:bg-[var(--highlight)]/90"
            >
              Записаться на диагностику →
            </a>
            <a
              href={CONTACT_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/8"
            >
              Позвонить прямо сейчас
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Volvo Titan | Ремонт Volvo в Москве с 1995 года",
  description:
    "Премиальный сервис Volvo в Москве. Диагностика, ТО, ремонт агрегатов, ходовой, электрика и кузовной ремонт. Минимальная очередь, честная диагностика, гарантия на работы.",
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home() {
  const localBusinessSchema = createLocalBusinessSchema();

  return (
    <>
      <SiteNavbar />
      <main id="top" className="page-bottom-safe relative overflow-hidden md:pb-0">
        <HeroSection />
        <div className="section-atmosphere">
          <TrustStrip />
        </div>
        <div className="section-atmosphere">
          <BenefitsSection />
        </div>
        <div className="section-atmosphere">
          <ServicesSection />
        </div>
        <div className="section-atmosphere">
          <DiagnosticsOffer />
        </div>
        <div className="section-atmosphere">
          <WorksSection />
        </div>
        <div className="section-atmosphere">
          <MechanicSection />
        </div>
        <div className="section-atmosphere">
          <GallerySection />
        </div>
        <div className="section-atmosphere">
          <ReviewsSection />
        </div>
        <div className="section-atmosphere">
          <FaqSection />
        </div>
        <div className="section-atmosphere">
          <ProcessSection />
        </div>
        <div className="section-atmosphere">
          <CtaSection />
        </div>
        <div className="section-atmosphere">
          <MapSection />
        </div>
        <div className="section-atmosphere">
          <ContactSection />
        </div>
        <div className="section-atmosphere">
          <FinalCta />
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Footer />
      <StickyCtaBar />
      <SectionVisibilityTracker />
    </>
  );
}
