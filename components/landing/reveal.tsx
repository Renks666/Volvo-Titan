"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const MAX_DELAY_SECONDS = 0.3;

/**
 * Контент по умолчанию виден (SSR, без JS, reduced-motion). Скрытие и показ
 * включаются только на клиенте и только для блоков ниже экрана.
 * Стили состояний: [data-reveal] в styles/theme.css.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Уже на экране или выше него (восстановленная прокрутка, переход «назад») — не прячем.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "hidden";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      delete el.dataset.reveal;
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={delay ? { transitionDelay: `${Math.min(delay, MAX_DELAY_SECONDS)}s` } : undefined}
    >
      {children}
    </div>
  );
}
