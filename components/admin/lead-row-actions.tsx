"use client";

import { useState, useTransition } from "react";
import { LoaderCircle, RefreshCw, Trash2 } from "lucide-react";

import { deleteLeadAction, updateLeadStatusAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { LeadRecord } from "@/lib/types";

interface LeadRowActionsProps {
  lead: LeadRecord;
}

export function LeadRowActions({ lead }: LeadRowActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const nextStatus = lead.status === "new" ? "processed" : "new";
  const nextStatusLabel =
    lead.status === "new" ? "Отметить обработанной" : "Вернуть в новые";

  const closeDeleteDialog = () => {
    if (isPending) {
      return;
    }

    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          className="h-10 px-4"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await updateLeadStatusAction({ id: lead.id, status: nextStatus });
            })
          }
        >
          {isPending ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          {nextStatusLabel}
        </Button>
        <Button
          variant="danger"
          className="h-10 px-4"
          disabled={isPending}
          onClick={() => setIsDeleteOpen(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Удалить
        </Button>
      </div>

      <ConfirmDialog
        open={isDeleteOpen}
        title="Удалить заявку навсегда?"
        description="Заявка будет удалена из CRM без возможности восстановления. Используйте это действие только если запись действительно больше не нужна."
        confirmLabel={isPending ? "Удаляем..." : "Удалить"}
        isPending={isPending}
        onClose={closeDeleteDialog}
        onConfirm={() =>
          startTransition(async () => {
            await deleteLeadAction(lead.id);
            setIsDeleteOpen(false);
          })
        }
      >
        <div className="overlay-danger-surface rounded-[1.4rem] px-4 py-3 text-sm text-rose-100">
          Клиент: {lead.name || "Без имени"} • {lead.phone}
        </div>
      </ConfirmDialog>
    </>
  );
}
