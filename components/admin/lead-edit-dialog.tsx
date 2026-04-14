"use client";

import { AnimatePresence } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useId, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";

import { updateLeadAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  OverlayBackdrop,
  OverlayPanel,
  useBodyScrollLock,
  useDismissableLayer,
  useEscapeKey,
  useFocusTrap,
} from "@/components/ui/overlay";
import { SERVICE_OPTIONS, VOLVO_MODEL_OPTIONS } from "@/lib/constants";
import type { LeadRecord } from "@/lib/types";

interface LeadEditDialogProps {
  lead: LeadRecord;
  open: boolean;
  onClose: () => void;
}

export function LeadEditDialog({ lead, open, onClose }: LeadEditDialogProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  const [name, setName] = useState(lead.name ?? "");
  const [model, setModel] = useState(lead.model ?? "");
  const [service, setService] = useState(lead.service ?? "");
  const [comment, setComment] = useState(lead.comment ?? "");

  const [isPending, startTransition] = useTransition();

  useBodyScrollLock(open);
  useEscapeKey(open, onClose);
  useDismissableLayer({
    active: open,
    refs: [panelRef],
    onDismiss: onClose,
    ignorePortalContent: true,
  });
  useFocusTrap({
    active: open,
    containerRef: panelRef,
  });

  const handleSave = () => {
    startTransition(async () => {
      await updateLeadAction({ id: lead.id, name, model, service, comment });
      onClose();
    });
  };

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
            tabIndex={-1}
            className="overlay-panel--flat z-[1] w-full max-w-md rounded-[1.9rem] border-white/0 bg-[linear-gradient(180deg,rgba(10,16,27,0.98),rgba(7,12,22,0.96))] p-6 shadow-none sm:p-7"
          >
            <div className="relative">
              <p id={titleId} className="font-heading text-xl leading-tight text-white">
                Редактировать заявку
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Телефон:{" "}
                <a href={`tel:${lead.phone}`} className="text-slate-200 hover:text-white transition">
                  {lead.phone}
                </a>
              </p>

              <div className="mt-5 grid gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Имя
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Не указано"
                    disabled={isPending}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Модель авто
                  </label>
                  <Select
                    options={VOLVO_MODEL_OPTIONS}
                    value={model}
                    onValueChange={setModel}
                    placeholder="Выберите модель"
                    disabled={isPending}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Услуга
                  </label>
                  <Select
                    options={SERVICE_OPTIONS}
                    value={service}
                    onValueChange={setService}
                    placeholder="Выберите услугу"
                    disabled={isPending}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Комментарий
                  </label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Без комментария"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="ghost"
                  className="w-full sm:w-auto"
                  onClick={onClose}
                  disabled={isPending}
                >
                  Отмена
                </Button>
                <Button
                  className="w-full sm:w-auto"
                  onClick={handleSave}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Сохраняем...
                    </>
                  ) : (
                    "Сохранить"
                  )}
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
