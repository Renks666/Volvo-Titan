"use client";

import { useEffect, useState } from "react";
import { MessageCircleMore, PhoneCall } from "lucide-react";

import { CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/utils/cn";
import { trackCtaEvent } from "@/utils/analytics";

export function FloatingContactBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onMenuToggle = (event: Event) => {
      const detail = (event as CustomEvent<{ open?: boolean }>).detail;
      setIsMenuOpen(Boolean(detail?.open));
    };

    window.addEventListener("vt-mobile-menu", onMenuToggle as EventListener);

    return () => {
      window.removeEventListener("vt-mobile-menu", onMenuToggle as EventListener);
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(0.75rem+var(--safe-area-bottom))] transition duration-200 md:hidden",
        isMenuOpen && "opacity-0",
      )}
    >
      <div className="glass-panel metal-border pointer-events-auto mx-auto flex max-w-md items-center gap-2 rounded-[1.35rem] px-2.5 py-2">
        <a
          href={CONTACT_INFO.phoneHref}
          onClick={() => trackCtaEvent("phone_click", { location: "floating_bar" })}
          className="cta-shimmer flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#eef4ff_0%,#b7c5dc_45%,#eef4ff_100%)] px-3.5 text-sm font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(188,204,233,0.34)]"
          data-tone="light"
        >
          <PhoneCall className="h-4 w-4" />
          Позвонить
        </a>
        <a
          href="#lead"
          onClick={() => trackCtaEvent("lead_cta_click", { location: "floating_bar" })}
          className="cta-shimmer flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_18px_40px_rgba(52,84,145,0.2)]"
          data-tone="dark"
        >
          <MessageCircleMore className="h-4 w-4" />
          Заявка
        </a>
      </div>
    </div>
  );
}
