"use client";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    ym?: (id: number, action: string, target?: string, params?: Record<string, unknown>) => void;
  }
}

const YM_GOAL_MAP: Record<string, string> = {
  lead_submit_success: "form_submit",
  phone_click: "phone_click",
  messenger_click: "messenger_click",
  lead_cta_click: "lead_cta_click",
};

function ymGoal(target: string) {
  const ymId = process.env.NEXT_PUBLIC_YM_ID ? Number(process.env.NEXT_PUBLIC_YM_ID) : null;
  if (typeof window !== "undefined" && window.ym && ymId) {
    window.ym(ymId, "reachGoal", target);
  }
}

export function trackCtaEvent(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
    timestamp: Date.now(),
  });

  const ymTarget = YM_GOAL_MAP[event];
  if (ymTarget) {
    ymGoal(ymTarget);
  }
}
