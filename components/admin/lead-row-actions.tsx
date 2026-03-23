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
    lead.status === "new"
      ? "\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u043d\u043e\u0439"
      : "\u0412\u0435\u0440\u043d\u0443\u0442\u044c \u0432 \u043d\u043e\u0432\u044b\u0435";

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
          className="h-10 w-full px-4 sm:w-auto"
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
          className="h-10 w-full px-4 sm:w-auto"
          disabled={isPending}
          onClick={() => setIsDeleteOpen(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"}
        </Button>
      </div>

      <ConfirmDialog
        open={isDeleteOpen}
        title={"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443 \u043d\u0430\u0432\u0441\u0435\u0433\u0434\u0430?"}
        description={
          "\u0417\u0430\u044f\u0432\u043a\u0430 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043b\u0435\u043d\u0430 \u0438\u0437 CRM \u0431\u0435\u0437 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u0438 \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f. \u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u044d\u0442\u043e \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u0435\u0441\u043b\u0438 \u0437\u0430\u043f\u0438\u0441\u044c \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0431\u043e\u043b\u044c\u0448\u0435 \u043d\u0435 \u043d\u0443\u0436\u043d\u0430."
        }
        confirmLabel={
          isPending ? "\u0423\u0434\u0430\u043b\u044f\u0435\u043c..." : "\u0423\u0434\u0430\u043b\u0438\u0442\u044c"
        }
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
          {"\u041a\u043b\u0438\u0435\u043d\u0442:"} {lead.name || "\u0411\u0435\u0437 \u0438\u043c\u0435\u043d\u0438"} {"\u2022"} {lead.phone}
        </div>
      </ConfirmDialog>
    </>
  );
}
