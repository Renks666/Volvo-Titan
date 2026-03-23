"use client";

import {
  type MotionProps,
  motion,
  useReducedMotion,
} from "framer-motion";
import type {
  ComponentProps,
  MutableRefObject,
  ReactNode,
  RefObject,
} from "react";
import { useEffect, useEffectEvent } from "react";

import { cn } from "@/utils/cn";

const OVERLAY_EASE = [0.16, 1, 0.3, 1] as const;

type OverlayVariant = "dialog" | "drawer" | "popover";

function getPanelOffset(variant: OverlayVariant) {
  if (variant === "popover") {
    return 18;
  }

  return 24;
}

function getBackdropMotion(shouldReduceMotion: boolean): MotionProps {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.16 },
    };
  }

  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.24, ease: OVERLAY_EASE },
  };
}

function getPanelMotion(
  shouldReduceMotion: boolean,
  variant: OverlayVariant,
): MotionProps {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.16 },
    };
  }

  const offset = getPanelOffset(variant);

  return {
    initial: { opacity: 0, y: offset, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.32, ease: OVERLAY_EASE },
    },
    exit: {
      opacity: 0,
      y: -12,
      scale: 0.985,
      transition: { duration: 0.22, ease: OVERLAY_EASE },
    },
  };
}

export function OverlayBackdrop({
  className,
  ...props
}: ComponentProps<typeof motion.div>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "fixed inset-0 bg-[var(--overlay-backdrop)] backdrop-blur-[10px]",
        className,
      )}
      {...getBackdropMotion(Boolean(shouldReduceMotion))}
      {...props}
    />
  );
}

interface OverlayPanelProps extends ComponentProps<typeof motion.div> {
  variant?: OverlayVariant;
  children: ReactNode;
}

export function OverlayPanel({
  children,
  className,
  variant = "dialog",
  ...props
}: OverlayPanelProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "glass-panel metal-border overlay-panel rounded-[2rem]",
        "before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:z-[1] before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent",
        className,
      )}
      data-overlay-variant={variant}
      {...getPanelMotion(Boolean(shouldReduceMotion), variant)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);
}

export function useEscapeKey(active: boolean, onEscape: () => void) {
  const handleEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onEscape();
    }
  });

  useEffect(() => {
    if (!active) {
      return;
    }

    const listener = (event: KeyboardEvent) => handleEscape(event);
    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, [active]);
}

interface DismissableLayerOptions {
  active: boolean;
  refs: Array<RefObject<HTMLElement | null>>;
  onDismiss: () => void;
}

export function useDismissableLayer({
  active,
  refs,
  onDismiss,
}: DismissableLayerOptions) {
  const handlePointerDown = useEffectEvent((event: PointerEvent) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    const clickedInside = refs.some((ref) => ref.current?.contains(target));

    if (!clickedInside) {
      onDismiss();
    }
  });

  useEffect(() => {
    if (!active) {
      return;
    }

    const listener = (event: PointerEvent) => handlePointerDown(event);
    document.addEventListener("pointerdown", listener);

    return () => document.removeEventListener("pointerdown", listener);
  }, [active]);
}

interface FocusTrapOptions {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useFocusTrap({
  active,
  containerRef,
  initialFocusRef,
}: FocusTrapOptions) {
  const trapFocus = useEffectEvent((event: KeyboardEvent) => {
    if (event.key !== "Tab") {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const focusableElements = [...container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter(
      (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1,
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      container.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  useEffect(() => {
    if (!active) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const focusTarget = initialFocusRef?.current ?? container;

    requestAnimationFrame(() => {
      focusTarget.focus();
    });

    const listener = (event: KeyboardEvent) => trapFocus(event);
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
      previousActiveElement?.focus?.();
    };
  }, [active, containerRef, initialFocusRef]);
}

export function setRefValue<T>(
  ref: MutableRefObject<T | null> | ((value: T | null) => void) | null | undefined,
  value: T | null,
) {
  if (!ref) {
    return;
  }

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  ref.current = value;
}
