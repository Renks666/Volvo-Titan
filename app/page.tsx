import type { Metadata } from "next";

import { BenefitsSection } from "@/components/landing/benefits-section";
import { ContactSection } from "@/components/landing/contact-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FloatingContactBar } from "@/components/landing/floating-contact-bar";
import { HeroSection } from "@/components/landing/hero-section";
import { MapSection } from "@/components/landing/map-section";
import { MechanicSection } from "@/components/landing/mechanic-section";
import { ServicesSection } from "@/components/landing/services-section";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { TrustStrip } from "@/components/landing/trust-strip";
import { CONTACT_INFO, SITE_URL } from "@/lib/constants";
import { createLocalBusinessSchema } from "@/lib/metadata";

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
          <MechanicSection />
        </div>
        <div className="section-atmosphere">
          <BenefitsSection />
        </div>
        <div className="section-atmosphere">
          <ServicesSection />
        </div>
        <div className="section-atmosphere">
          <CtaSection />
        </div>
        <div className="section-atmosphere">
          <ContactSection />
        </div>
        <div className="section-atmosphere">
          <MapSection />
        </div>
      </main>
      <FloatingContactBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <footer className="border-t border-white/10 bg-black/50 px-4 py-6 text-sm text-slate-400 backdrop-blur-xl sm:px-6 sm:py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between">
          <p>Volvo Titan. Специализированный сервис Volvo в Москве.</p>
          <div className="flex flex-col gap-1 text-slate-500 md:text-right">
            <a
              className="flex flex-col gap-2 transition hover:text-white md:items-end"
              href={CONTACT_INFO.phoneHref}
            >
              <span className="text-[0.98rem] font-semibold leading-none text-slate-200">
                {CONTACT_INFO.phoneDisplay}
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-300">
                {CONTACT_INFO.phoneContactName}
              </span>
            </a>
            <p>{CONTACT_INFO.address}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
