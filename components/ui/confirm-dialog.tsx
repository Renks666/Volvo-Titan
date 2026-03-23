"use client";

import { AnimatePresence } from "framer-motion";
import type { ReactNode, RefObject } from "react";
import { useId, useRef } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import {
  OverlayBackdrop,
  OverlayPanel,
  useBodyScrollLock,
  useDismissableLayer,
  useEscapeKey,
  useFocusTrap,
} from "@/components/ui/overlay";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children?: ReactNode;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Отмена",
  isPending = false,
  onConfirm,
  onClose,
  children,
}: ConfirmDialogProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useBodyScrollLock(open);
  useEscapeKey(open, onClose);
  useDismissableLayer({
    active: open,
    refs: [panelRef as RefObject<HTMLElement | null>],
    onDismiss: onClose,
  });
  useFocusTrap({
    active: open,
    containerRef: panelRef as RefObject<HTMLElement | null>,
    initialFocusRef: cancelButtonRef as RefObject<HTMLElement | null>,
  });

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-6 sm:px-6">
          <OverlayBackdrop />
          <OverlayPanel
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            className="z-[1] w-full max-w-md rounded-[1.9rem] p-6 before:content-none after:content-none sm:p-7"
          >
            <div className="relative">
              <p
                id={titleId}
                className="font-heading text-xl leading-tight text-white"
              >
                {title}
              </p>
              <p
                id={descriptionId}
                className="mt-3 text-sm leading-7 text-slate-300"
              >
                {description}
              </p>
              {children ? <div className="mt-5">{children}</div> : null}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  ref={cancelButtonRef}
                  variant="ghost"
                  className="w-full sm:w-auto"
                  onClick={onClose}
                  disabled={isPending}
                >
                  {cancelLabel}
                </Button>
                <Button
                  variant="danger"
                  className="w-full sm:w-auto"
                  onClick={onConfirm}
                  disabled={isPending}
                >
                  {confirmLabel}
                </Button>
              </div>
            </div>
          </OverlayPanel>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
