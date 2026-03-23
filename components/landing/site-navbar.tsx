"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { ArrowRight, Menu, PhoneCall, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  OverlayBackdrop,
  OverlayPanel,
  useBodyScrollLock,
  useEscapeKey,
  useFocusTrap,
} from "@/components/ui/overlay";
import { CONTACT_INFO, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/utils/cn";
import { trackCtaEvent } from "@/utils/analytics";

const LANDING_TOP_ID = "top";
const HERO_SECTION_ID = "hero";
const NAVBAR_SCROLL_OFFSET = 104;
const NAVBAR_SCROLL_OFFSETS: Record<string, number> = {
  services: 35,
  contacts: 40,
};

type SiteNavbarProps = {
  items?: ReadonlyArray<{
    href: string;
    label: string;
  }>;
};

export function SiteNavbar({ items = NAV_ITEMS }: SiteNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(HERO_SECTION_ID);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const primaryActionRef = useRef<HTMLAnchorElement | null>(null);

  const navItems = useMemo(() => items.map((item) => ({ ...item })), [items]);
  const trackedSectionIds = useMemo(
    () => [HERO_SECTION_ID, ...navItems.map((item) => item.href.replace(/^#/, ""))],
    [navItems],
  );

  const syncNavbarState = useEffectEvent(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 20);

    let currentSection = HERO_SECTION_ID;

    for (const sectionId of trackedSectionIds) {
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

  const scrollToHref = (href: string) => {
    const targetId = href.replace(/^#/, "");
    const isTopTarget = targetId === LANDING_TOP_ID;
    const target = document.getElementById(targetId);
    const scrollOffset = NAVBAR_SCROLL_OFFSETS[targetId] ?? NAVBAR_SCROLL_OFFSET;

    if (!target) {
      return;
    }

    const nextTop = isTopTarget
      ? 0
      : Math.max(window.scrollY + target.getBoundingClientRect().top - scrollOffset, 0);

    window.history.pushState(null, "", href);
    window.scrollTo({ top: nextTop, behavior: "smooth" });
    setActiveId(isTopTarget ? HERO_SECTION_ID : targetId);
  };

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

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, () => setIsOpen(false));
  useFocusTrap({
    active: isOpen,
    containerRef: menuPanelRef,
    initialFocusRef: primaryActionRef,
  });

  useEffect(() => {
    document.body.dataset.mobileMenuOpen = isOpen ? "true" : "false";
    window.dispatchEvent(
      new CustomEvent("vt-mobile-menu", {
        detail: { open: isOpen },
      }),
    );

    return () => {
      document.body.dataset.mobileMenuOpen = "false";
      window.dispatchEvent(
        new CustomEvent("vt-mobile-menu", {
          detail: { open: false },
        }),
      );
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const getIsActive = (href: string) => href === `#${activeId}`;

  const handleAnchorNavigation = (href: string, options?: { closeMenu?: boolean }) => {
    if (options?.closeMenu) {
      setIsOpen(false);
      window.setTimeout(() => scrollToHref(href), 20);
      return;
    }

    scrollToHref(href);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] px-3 pt-[calc(0.75rem+var(--safe-area-top))] sm:px-4 md:px-6 md:pt-4">
        <header
          className={cn(
            "pointer-events-auto mx-auto flex w-full max-w-7xl items-center justify-between gap-2 rounded-[1.4rem] border border-white/10 px-2.5 py-2.5 transition duration-300 sm:rounded-[1.75rem] sm:px-3 sm:py-3 md:px-4",
            isScrolled
              ? "bg-[rgba(7,13,24,0.82)] shadow-[0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
              : "bg-[rgba(7,13,24,0.42)] shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-xl",
          )}
        >
          <a
            href="#top"
            className="group flex min-w-0 items-center rounded-full px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)]"
            aria-label="Volvo Titan — наверх страницы"
            onClick={(event) => {
              event.preventDefault();
              handleAnchorNavigation("#top", { closeMenu: isOpen });
            }}
          >
            <Image
              src="/brand/volvo-titan-mark-mobile.png"
              alt="Volvo Titan"
              width={812}
              height={785}
              priority
              className="h-9 w-auto object-contain sm:hidden"
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
                onClick={(event) => {
                  event.preventDefault();
                  handleAnchorNavigation(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={CONTACT_INFO.phoneHref}
              className="inline-flex h-10 min-w-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] px-3 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)]"
              onClick={() => trackCtaEvent("phone_click", { location: "navbar_mobile_primary" })}
            >
              <PhoneCall className="mr-2 h-4 w-4 shrink-0 text-[var(--highlight)]" />
              <span className="truncate">Позвонить</span>
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[1.1rem] border border-white/10 bg-white/6 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)]"
              aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setIsOpen((current) => !current)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={CONTACT_INFO.phoneHref}
              className="rounded-full px-3 py-2 text-sm text-slate-300 transition hover:text-white"
              onClick={() => trackCtaEvent("phone_click", { location: "navbar" })}
            >
              {CONTACT_INFO.phoneDisplay}
            </a>
            <a
              href="#lead"
              onClick={(event) => {
                event.preventDefault();
                trackCtaEvent("lead_cta_click", { location: "navbar" });
                handleAnchorNavigation("#lead");
              }}
            >
              <Button className="h-11 px-5">
                <PhoneCall className="mr-2 h-4 w-4" />
                Записаться
              </Button>
            </a>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <>
            <OverlayBackdrop className="z-[65] lg:hidden" aria-hidden onClick={closeMenu} />
            <div className="fixed inset-x-0 top-[calc(4.55rem+var(--safe-area-top))] z-[75] px-3 sm:px-4 lg:hidden">
              <OverlayPanel
                ref={menuPanelRef}
                id="mobile-nav-drawer"
                variant="dialog"
                aria-hidden={!isOpen}
                aria-label="Мобильное меню"
                tabIndex={-1}
                className="mx-auto w-full max-w-md rounded-[1.65rem] p-3 sm:rounded-[1.9rem] sm:p-4"
              >
                <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(236,243,255,0.16),transparent_72%)]" />
                <div className="relative">
                  <div className="grid gap-2.5">
                    <a
                      ref={primaryActionRef}
                      href="#lead"
                      className="group flex items-center justify-between rounded-[1.25rem] border border-white/12 bg-[linear-gradient(135deg,rgba(238,244,255,0.96),rgba(183,197,220,0.9))] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
                      onClick={(event) => {
                        event.preventDefault();
                        trackCtaEvent("lead_cta_click", { location: "navbar_mobile_menu_primary" });
                        handleAnchorNavigation("#lead", { closeMenu: true });
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <PhoneCall className="h-4 w-4" />
                        Записаться на сервис
                      </span>
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </a>

                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="rounded-[1.15rem] border border-white/10 bg-black/15 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/8 hover:text-white"
                      onClick={() => {
                        closeMenu();
                        trackCtaEvent("phone_click", { location: "navbar_mobile_menu_phone" });
                      }}
                    >
                      {CONTACT_INFO.phoneDisplay}
                    </a>
                  </div>

                  <nav className="mt-3 grid gap-1.5" aria-label="Мобильная навигация">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "rounded-[1.15rem] px-4 py-3 text-[0.95rem] font-medium text-slate-300 transition hover:bg-white/8 hover:text-white",
                          getIsActive(item.href) && "bg-white/[0.08] text-white",
                        )}
                        onClick={(event) => {
                          event.preventDefault();
                          handleAnchorNavigation(item.href, { closeMenu: true });
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>

                  <div className="mt-4 grid gap-2 border-t border-white/10 pt-4">
                    <a
                      href={CONTACT_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[1.15rem] border border-white/10 bg-black/15 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/8 hover:text-white"
                      onClick={() => {
                        closeMenu();
                        trackCtaEvent("messenger_click", { location: "navbar_mobile_whatsapp" });
                      }}
                    >
                      WhatsApp
                    </a>
                    <a
                      href={CONTACT_INFO.telegramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[1.15rem] border border-white/10 bg-black/15 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/8 hover:text-white"
                      onClick={() => {
                        closeMenu();
                        trackCtaEvent("messenger_click", { location: "navbar_mobile_telegram" });
                      }}
                    >
                      Telegram
                    </a>
                  </div>
                </div>
              </OverlayPanel>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
