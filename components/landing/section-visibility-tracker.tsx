"use client";

import { useEffect } from "react";

import { trackCtaEvent } from "@/utils/analytics";

const SECTIONS = ["services", "diagnostics", "lead", "faq", "reviews"] as const;

export function SectionVisibilityTracker() {
  useEffect(() => {
    const fired = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            if (id && !fired.has(id)) {
              fired.add(id);
              trackCtaEvent("section_visible", { section: id });
            }
          }
        }
      },
      { threshold: 0.2 },
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
