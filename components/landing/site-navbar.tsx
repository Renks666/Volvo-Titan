"use client";

import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { Menu, PhoneCall, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { CONTACT_INFO, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/utils/cn";
import { trackCtaEvent } from "@/utils/analytics";

const NAVBAR_SECTION_IDS = ["hero", "benefits", "services", "lead-form", "contacts"] as const;

type SiteNavbarProps = {
  items?: ReadonlyArray<{
    href: string;
    label: string;
  }>;
};

export function SiteNavbar({ items = NAV_ITEMS }: SiteNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");

  const navItems = useMemo(() => items.map((item) => ({ ...item })), [items]);

  const syncNavbarState = useEffectEvent(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 20);

    let currentSection = "hero";

    for (const sectionId of NAVBAR_SECTION_IDS) {
      const section = document.getElementById(sectionId);

      if (!section) {
        continue;
      }

      const { top } = section.getBoundingClientRect();

      if (top <= 140) {
        currentSection = sectionId;
      }
    }

    setActiveId(currentSection);
  });

  useEffect(() => {
    syncNavbarState();

    const onScroll = () => syncNavbarState();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const getIsActive = (href: string) => href === `#${activeId}`;

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] px-4 pt-4 md:px-6">
        <header
          className={cn(
            "pointer-events-auto mx-auto flex w-full max-w-7xl items-center justify-between rounded-[1.75rem] border border-white/10 px-3 py-3 transition duration-300 md:px-4",
            isScrolled
              ? "bg-[rgba(7,13,24,0.82)] shadow-[0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
              : "bg-[rgba(7,13,24,0.42)] shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-xl",
          )}
        >
          <a
            href="#top"
            className="group flex items-center rounded-full px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)]"
            aria-label="Volvo Titan — вверх страницы"
            onClick={closeMenu}
          >
            <Image
              src="/brand/volvo-titan-mark-mobile.png"
              alt="Volvo Titan"
              width={812}
              height={785}
              priority
              className="h-10 w-auto object-contain sm:hidden"
            />
            <div className="hidden min-w-0 sm:block">
              <p className="font-heading text-sm uppercase tracking-[0.24em] text-white">
                Volvo Titan
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-2 lg:flex" aria-label="Основная навигация">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white",
                  getIsActive(item.href) && "bg-white/10 text-white",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={CONTACT_INFO.phoneHref}
              className="rounded-full px-3 py-2 text-sm text-slate-300 transition hover:text-white"
              onClick={() => trackCtaEvent("phone_click", { location: "navbar" })}
            >
              {CONTACT_INFO.phoneDisplay}
            </a>
            <a
              href="#lead-form"
              onClick={() => trackCtaEvent("lead_cta_click", { location: "navbar" })}
            >
              <Button className="h-11 px-5">
                <PhoneCall className="mr-2 h-4 w-4" />
                Записаться
              </Button>
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)] lg:hidden"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[65] bg-[rgba(2,6,14,0.58)] transition duration-300 lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isOpen}
        onClick={closeMenu}
      />

      <aside
        id="mobile-nav-drawer"
        className={cn(
          "fixed right-4 top-[5.25rem] z-[75] w-[min(24rem,calc(100vw-2rem))] rounded-[2rem] transition duration-300 lg:hidden",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        )}
        aria-hidden={!isOpen}
      >
        <div className="glass-panel metal-border overflow-hidden rounded-[2rem] p-4">
          <nav className="grid gap-2" aria-label="Мобильная навигация">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-[1.25rem] px-4 py-3 text-base font-medium text-slate-200 transition hover:bg-white/8 hover:text-white",
                  getIsActive(item.href) && "bg-white/10 text-white",
                )}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 grid gap-3 border-t border-white/10 pt-4">
            <a
              href={CONTACT_INFO.phoneHref}
              className="rounded-[1.25rem] border border-white/10 bg-black/15 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/8 hover:text-white"
              onClick={() => {
                closeMenu();
                trackCtaEvent("phone_click", { location: "navbar_mobile" });
              }}
            >
              {CONTACT_INFO.phoneDisplay}
            </a>
            <a
              href="#lead-form"
              onClick={() => {
                closeMenu();
                trackCtaEvent("lead_cta_click", { location: "navbar_mobile" });
              }}
            >
              <Button className="w-full">
                <PhoneCall className="mr-2 h-4 w-4" />
                Записаться
              </Button>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
