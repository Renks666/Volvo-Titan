"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { TRUST_METRICS } from "@/lib/constants";

type ParsedMetric = {
  kind: "number" | "text";
  rawValue: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
};

function parseMetricValue(value: string): ParsedMetric {
  const match = value.match(/^([^0-9]*)(\d+(?:[.,]\d+)?)(.*)$/);

  if (!match) {
    return { kind: "text", rawValue: value };
  }

  const [, prefix = "", numericPart, suffix = ""] = match;

  return {
    kind: "number",
    rawValue: value,
    numericValue: Number(numericPart.replace(",", ".")),
    prefix,
    suffix,
  };
}

function AnimatedMetricValue({ value }: { value: string }) {
  const parsedValue = useMemo(() => parseMetricValue(value), [value]);
  const valueRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(valueRef, { once: true, amount: 0.7 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number | string>(
    parsedValue.kind === "number" ? 0 : value,
  );

  useEffect(() => {
    if (parsedValue.kind !== "number") {
      return;
    }

    if (!isInView) {
      return;
    }

    if (shouldReduceMotion) {
      return;
    }

    const duration = 1400;
    const startTime = window.performance.now();
    let frameId = 0;

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      const nextValue = Math.round((parsedValue.numericValue ?? 0) * easedProgress);
      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [isInView, parsedValue, shouldReduceMotion, value]);

  const content =
    parsedValue.kind === "number"
      ? `${parsedValue.prefix ?? ""}${shouldReduceMotion ? (parsedValue.numericValue ?? 0) : displayValue}${parsedValue.suffix ?? ""}`
      : value;

  return (
    <p ref={valueRef} className="font-heading text-2xl text-white">
      {content}
    </p>
  );
}

export function TrustStrip() {
  return (
    <section className="px-6 py-8 md:py-10">
      <div className="section-shell">
        <div className="glass-panel metal-border grid gap-4 rounded-[2rem] p-6 md:grid-cols-4">
          {TRUST_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[1.5rem] border border-white/10 bg-black/15 p-5"
            >
              <AnimatedMetricValue value={metric.value} />
              <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
