"use client";

import { useEffect, useState } from "react";

import { trackCtaEvent } from "@/utils/analytics";

const SHOW_AFTER_PX = 300;
const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fired = new Set<number>();

    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);

      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = Math.floor((scrolled / total) * 100);

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

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center border-t border-white/10 bg-[#060d1b]/95 px-3 py-2.5 backdrop-blur-xl">
        <a
          href="#lead"
          onClick={() => trackCtaEvent("lead_cta_click", { location: "sticky_bar" })}
          className="flex flex-1 items-center justify-center rounded-xl bg-[var(--highlight)] px-4 py-2.5 text-sm font-semibold text-[#050913] transition hover:bg-[var(--highlight)]/90"
        >
          Записаться — бесплатно →
        </a>
      </div>
    </div>
  );
}
