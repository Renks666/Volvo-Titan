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
const MOBILE_NAVBAR_SCROLL_GAP = 8;
const DESKTOP_NAVBAR_SCROLL_GAP = 20;

const LABELS = {
  top: "Volvo Titan \u2014 \u043d\u0430\u0432\u0435\u0440\u0445 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b",
  mobileTagline: "\u0441\u0435\u0440\u0432\u0438\u0441 Volvo",
  primaryNav: "\u041e\u0441\u043d\u043e\u0432\u043d\u0430\u044f \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f",
  call: "\u041f\u043e\u0437\u0432\u043e\u043d\u0438\u0442\u044c",
  callShort: "\u0417\u0432\u043e\u043d\u043e\u043a",
  closeMenu: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e",
  openMenu: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e",
  book: "\u0417\u0430\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f",
  mobileMenu: "\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0435 \u043c\u0435\u043d\u044e",
  contacts: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b",
  bookService: "\u0417\u0430\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f \u043d\u0430 \u0441\u0435\u0440\u0432\u0438\u0441",
  mobileNav: "\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u0430\u044f \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f",
  serviceAddress: "\u0410\u0434\u0440\u0435\u0441 \u0441\u0435\u0440\u0432\u0438\u0441\u0430",
} as const;

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
  const headerRef = useRef<HTMLElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const primaryActionRef = useRef<HTMLAnchorElement | null>(null);

  const navItems = useMemo(() => items.map((item) => ({ ...item })), [items]);
  const trackedSectionIds = useMemo(
    () => [HERO_SECTION_ID, ...navItems.map((item) => item.href.replace(/^#/, ""))],
    [navItems],
  );
  const shortAddress = useMemo(
    () => CONTACT_INFO.address.split(", ").slice(0, 2).join(", "),
    [],
  );

  const getNavbarOffset = () => {
    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const scrollGap =
      typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
        ? DESKTOP_NAVBAR_SCROLL_GAP
        : MOBILE_NAVBAR_SCROLL_GAP;

    return Math.max(Math.ceil(headerHeight + scrollGap), 0);
  };

  const getAnchorElement = (targetId: string) => {
    const target = document.getElementById(targetId);

    if (!target) {
      return null;
    }

    if (targetId === HERO_SECTION_ID || targetId === LANDING_TOP_ID) {
      return target;
    }

    return target.querySelector<HTMLElement>(".section-shell") ?? target;
  };

  const syncLandingNavOffset = () => {
    const nextOffset = getNavbarOffset();

    if (nextOffset > 0) {
      document.documentElement.style.setProperty("--landing-nav-offset", `${nextOffset}px`);
    }
  };

  const syncNavbarState = useEffectEvent(() => {
    syncLandingNavOffset();

    const scrollY = window.scrollY;
    const currentOffset = getNavbarOffset();
    setIsScrolled(scrollY > 20);

    let currentSection = HERO_SECTION_ID;

    for (const sectionId of trackedSectionIds) {
      const section = getAnchorElement(sectionId);

      if (!section) {
        continue;
      }

      const { top } = section.getBoundingClientRect();

      if (top <= currentOffset + 32) {
        currentSection = sectionId;
      }
    }

    setActiveId(currentSection);
  });

  const scrollToHref = (href: string) => {
    const targetId = href.replace(/^#/, "");
    const isTopTarget = targetId === LANDING_TOP_ID;
    const target = getAnchorElement(targetId);
    const scrollOffset = getNavbarOffset();

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
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] bg-[rgb(6,10,17)] pt-[var(--safe-area-top)] md:bg-transparent md:px-6 md:pt-4">
        <header
          ref={headerRef}
          className={cn(
            "pointer-events-auto mx-auto flex w-full max-w-7xl items-center justify-between gap-2 border-b border-white/10 px-4 pb-3 pt-0 transition duration-300 md:rounded-[1.75rem] md:border md:px-4 md:py-3",
            isScrolled
              ? "bg-[rgba(5,10,18,0.96)] shadow-[0_14px_34px_rgba(0,0,0,0.34)] backdrop-blur-xl md:bg-[rgba(7,13,24,0.82)] md:shadow-[0_18px_48px_rgba(0,0,0,0.34)] md:backdrop-blur-2xl"
              : "bg-[rgba(6,10,17,0.92)] shadow-[0_10px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl md:bg-[rgba(7,13,24,0.42)] md:shadow-[0_10px_30px_rgba(0,0,0,0.16)]",
          )}
        >
          <a
            href="#top"
            className="group flex min-w-0 items-center rounded-full py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)]"
            aria-label={LABELS.top}
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
              className="mr-3 h-10 w-auto object-contain md:hidden"
            />
            <div className="min-w-0 md:hidden">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white">
                Volvo Titan
              </p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-slate-400">
                {LABELS.mobileTagline}
              </p>
            </div>
            <div className="hidden min-w-0 md:block">
              <p className="font-heading text-sm uppercase tracking-[0.24em] text-white">
                Volvo Titan
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-2 lg:flex" aria-label={LABELS.primaryNav}>
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

          <div className="flex items-center gap-0 lg:hidden">
            <a
              href={CONTACT_INFO.phoneHref}
              className="inline-flex h-11 min-w-0 items-center justify-center border-x border-white/10 px-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)] md:h-10 md:rounded-full md:border md:bg-white/[0.07] md:px-3 md:text-sm md:font-medium md:tracking-normal md:hover:bg-white/10"
              onClick={() => trackCtaEvent("phone_click", { location: "navbar_mobile_primary" })}
            >
              <PhoneCall className="mr-2 h-4 w-4 shrink-0 text-[var(--highlight)]" />
              <span className="hidden truncate min-[390px]:inline md:inline">{LABELS.call}</span>
              <span className="truncate min-[390px]:hidden md:hidden">{LABELS.callShort}</span>
            </a>

            <button
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border-r border-white/10 text-white transition hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,164,255,0.65)] md:h-10 md:w-10 md:rounded-[1.1rem] md:border md:bg-white/6 md:hover:bg-white/10"
              aria-label={isOpen ? LABELS.closeMenu : LABELS.openMenu}
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
              className="rounded-full px-3 py-2.5 text-sm text-slate-300 transition hover:text-white"
              onClick={() => trackCtaEvent("phone_click", { location: "navbar" })}
            >
              <span className="flex flex-col gap-2 leading-none">
                <span className="text-[0.95rem] font-semibold text-white">
                  {CONTACT_INFO.phoneDisplay}
                </span>
                <span className="pl-px text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-300">
                  {CONTACT_INFO.phoneContactName}
                </span>
              </span>
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
                {LABELS.book}
              </Button>
            </a>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <>
            <OverlayBackdrop className="z-[65] lg:hidden" aria-hidden onClick={closeMenu} />
            <div className="fixed inset-x-0 top-[var(--landing-nav-offset)] z-[75] px-0 lg:hidden">
              <OverlayPanel
                ref={menuPanelRef}
                id="mobile-nav-drawer"
                variant="dialog"
                aria-hidden={!isOpen}
                aria-label={LABELS.mobileMenu}
                tabIndex={-1}
                className="overlay-panel--flat mx-auto flex min-h-[calc(100dvh-var(--landing-nav-offset))] w-full max-w-none flex-col rounded-none border-x-0 border-b-0 border-t border-white/10 p-0 md:hidden"
                style={{
                  background: "rgb(31, 38, 52)",
                  boxShadow: "none",
                  backdropFilter: "none",
                }}
              >
                <div className="relative flex min-h-full flex-1 flex-col">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] border-b border-white/10">
                    <div className="border-r border-white/10 px-4 py-3.5">
                      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
                        {LABELS.contacts}
                      </p>
                      <div className="mt-2 space-y-2.5">
                        <p className="text-base font-semibold leading-none text-white">
                          {CONTACT_INFO.phoneDisplay}
                        </p>
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
                          {CONTACT_INFO.phoneContactName}
                        </p>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{shortAddress}</p>
                    </div>
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="flex min-h-full items-center justify-center px-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--highlight)] transition hover:bg-white/6 hover:text-white"
                      onClick={() => {
                        closeMenu();
                        trackCtaEvent("phone_click", { location: "navbar_mobile_menu_phone" });
                      }}
                    >
                      {LABELS.call}
                    </a>
                  </div>

                  <div className="border-b border-white/10 px-4 py-3">
                    <a
                      ref={primaryActionRef}
                      href="#lead"
                      className="group flex items-center justify-between rounded-[1.15rem] border border-[rgba(126,164,255,0.28)] bg-[linear-gradient(135deg,rgba(27,46,81,0.98),rgba(12,21,38,0.98))] px-4 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_16px_34px_rgba(3,8,18,0.26)] transition hover:-translate-y-0.5 hover:border-[rgba(126,164,255,0.42)] hover:bg-[linear-gradient(135deg,rgba(33,56,96,0.98),rgba(14,24,42,0.98))]"
                      onClick={(event) => {
                        event.preventDefault();
                        trackCtaEvent("lead_cta_click", { location: "navbar_mobile_menu_primary" });
                        handleAnchorNavigation("#lead", { closeMenu: true });
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <PhoneCall className="h-4 w-4 text-[var(--highlight)]" />
                        {LABELS.bookService}
                      </span>
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </a>
                  </div>

                  <nav className="grid" aria-label={LABELS.mobileNav}>
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "border-b border-white/10 px-4 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-slate-300 transition hover:bg-white/6 hover:text-white",
                          getIsActive(item.href) && "bg-white/[0.05] text-white",
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

                  <div className="mt-auto border-t border-white/10">
                    <div className="grid gap-px bg-white/10 sm:grid-cols-3 sm:gap-0">
                      <a
                        href={CONTACT_INFO.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[rgb(31,38,52)] px-4 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-300 transition hover:bg-white/6 hover:text-white sm:border-r sm:border-white/10"
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
                        className="bg-[rgb(31,38,52)] px-4 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-300 transition hover:bg-white/6 hover:text-white sm:border-r sm:border-white/10"
                        onClick={() => {
                          closeMenu();
                          trackCtaEvent("messenger_click", { location: "navbar_mobile_telegram" });
                        }}
                      >
                        Telegram
                      </a>
                      <div className="bg-[rgb(31,38,52)] px-4 py-4 text-center">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-300">
                          MAX
                        </p>
                        <p className="mt-2 text-sm font-semibold text-white">
                          {CONTACT_INFO.phoneDisplay}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-white/10 px-4 py-3.5">
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-slate-500">
                        {LABELS.serviceAddress}
                      </p>
                      <p className="mt-2 max-w-[28rem] text-sm leading-6 text-slate-300">
                        {CONTACT_INFO.address}
                      </p>
                    </div>
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
