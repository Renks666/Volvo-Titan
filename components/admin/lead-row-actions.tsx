"use client";

import { useTransition } from "react";
import { LoaderCircle, RefreshCw, Trash2 } from "lucide-react";

import { deleteLeadAction, updateLeadStatusAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import type { LeadRecord } from "@/lib/types";

interface LeadRowActionsProps {
  lead: LeadRecord;
}

export function LeadRowActions({ lead }: LeadRowActionsProps) {
  const [isPending, startTransition] = useTransition();

  const nextStatus = lead.status === "new" ? "processed" : "new";
  const nextStatusLabel =
    lead.status === "new" ? "Отметить обработанной" : "Вернуть в новые";

  return (
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
        onClick={() => {
          const shouldDelete = window.confirm("Удалить заявку без возможности восстановления?");

          if (!shouldDelete) {
            return;
          }

          startTransition(async () => {
            await deleteLeadAction(lead.id);
          });
        }}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Удалить
      </Button>
    </div>
  );
}
