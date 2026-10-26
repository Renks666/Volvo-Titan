"use client";

import { PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";
import { trackCtaEvent } from "@/utils/analytics";

const SHOW_AFTER_PX = 300;
const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export function StickyCtaBar() {
  const [scrolled, setScrolled] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const fired = new Set<number>();

    function onScroll() {
      setScrolled(window.scrollY > SHOW_AFTER_PX);

      const total = document.documentElement.scrollHeight;
      const pct = Math.floor(((window.scrollY + window.innerHeight) / total) * 100);

      for (const threshold of SCROLL_THRESHOLDS) {
        if (pct >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackCtaEvent("scroll_depth", { depth: threshold });
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Когда форма уже на экране, панель с призывом к записи не нужна.
  useEffect(() => {
    const form = document.getElementById("lead-form");
    if (!form) return;

    const observer = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting));
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const visible = scrolled && !formInView;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition duration-200 motion-reduce:transition-none lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex items-center gap-2 border-t border-white/10 bg-[#060d1b]/95 px-3 py-2.5 backdrop-blur-xl">
        <a
          href={CONTACT_INFO.phoneHref}
          onClick={() => trackCtaEvent("phone_click", { location: "sticky_bar" })}
          className={buttonVariants({ variant: "secondary", className: "shrink-0 gap-2 px-4 sm:px-4" })}
        >
          <PhoneCall className="h-4 w-4 text-[var(--highlight)]" aria-hidden />
          Позвонить
        </a>
        <a
          href="#lead"
          onClick={() => trackCtaEvent("lead_cta_click", { location: "sticky_bar" })}
          className={buttonVariants({ className: "flex-1 px-4 sm:px-4" })}
        >
          Записаться →
        </a>
      </div>
    </div>
  );
}
