"use client";

import { MessageCircleMore, PhoneCall } from "lucide-react";

import { CONTACT_INFO } from "@/lib/constants";
import { trackCtaEvent } from "@/utils/analytics";

export function FloatingContactBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4 md:hidden">
      <div className="glass-panel metal-border pointer-events-auto mx-auto flex max-w-md items-center gap-3 rounded-full px-3 py-3">
        <a
          href={CONTACT_INFO.phoneHref}
          onClick={() => trackCtaEvent("phone_click", { location: "floating_bar" })}
          className="cta-shimmer flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#eef4ff_0%,#b7c5dc_45%,#eef4ff_100%)] px-4 text-sm font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(188,204,233,0.34)]"
          data-tone="light"
        >
          <PhoneCall className="h-4 w-4" />
          Позвонить
        </a>
        <a
          href="#lead-form"
          onClick={() => trackCtaEvent("lead_cta_click", { location: "floating_bar" })}
          className="cta-shimmer flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_18px_40px_rgba(52,84,145,0.2)]"
          data-tone="dark"
        >
          <MessageCircleMore className="h-4 w-4" />
          Заявка
        </a>
      </div>
    </div>
  );
}
