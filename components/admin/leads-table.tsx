import { LEAD_STATUS_LABELS } from "@/lib/constants";
import { formatLeadDate } from "@/lib/format";
import type { LeadRecord } from "@/lib/types";
import { cn } from "@/utils/cn";

import { LeadRowActions } from "./lead-row-actions";

interface LeadsTableProps {
  leads: LeadRecord[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <section className="glass-panel metal-border rounded-[2rem] p-8 text-center text-slate-400">
        По текущим фильтрам заявки не найдены.
      </section>
    );
  }

  return (
    <section className="glass-panel metal-border overflow-hidden rounded-[2rem]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-left">
          <thead className="bg-[rgba(255,255,255,0.04)] text-xs uppercase tracking-[0.2em] text-slate-500">
            <tr>
              <th className="px-5 py-4">Клиент</th>
              <th className="px-5 py-4">Услуга и модель</th>
              <th className="px-5 py-4">Комментарий</th>
              <th className="px-5 py-4">Статус</th>
              <th className="px-5 py-4">Дата</th>
              <th className="px-5 py-4">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {leads.map((lead) => (
              <tr key={lead.id} className="align-top">
                <td className="px-5 py-5">
                  <div className="grid gap-2">
                    <p className="font-semibold text-white">
                      {lead.name && lead.name.length > 0 ? lead.name : "Без имени"}
                    </p>
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-sm text-slate-300 transition hover:text-white"
                    >
                      {lead.phone}
                    </a>
                  </div>
                </td>
                <td className="px-5 py-5 text-sm text-slate-300">
                  <div className="grid gap-2">
                    <span>{lead.service || "Не выбрано"}</span>
                    <span className="text-slate-500">Модель: {lead.model || "Не выбрано"}</span>
                  </div>
                </td>
                <td className="px-5 py-5 text-sm leading-7 text-slate-400">
                  {lead.comment || "Без комментария"}
                </td>
                <td className="px-5 py-5">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                      lead.status === "new"
                        ? "bg-[rgba(126,164,255,0.16)] text-[var(--chrome)]"
                        : "bg-[rgba(133,214,164,0.16)] text-emerald-200",
                    )}
                  >
                    {LEAD_STATUS_LABELS[lead.status]}
                  </span>
                </td>
                <td className="px-5 py-5 text-sm text-slate-400">
                  {formatLeadDate(lead.created_at)}
                </td>
                <td className="px-5 py-5">
                  <LeadRowActions lead={lead} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
