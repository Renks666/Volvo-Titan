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
      <section className="glass-panel metal-border rounded-[1.5rem] p-6 text-center text-slate-400 sm:rounded-[2rem] sm:p-8">
        {"\u041f\u043e \u0442\u0435\u043a\u0443\u0449\u0438\u043c \u0444\u0438\u043b\u044c\u0442\u0440\u0430\u043c \u0437\u0430\u044f\u0432\u043a\u0438 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b."}
      </section>
    );
  }

  return (
    <>
      <section className="grid gap-3 sm:hidden">
        {leads.map((lead) => (
          <article key={lead.id} className="glass-panel metal-border rounded-[1.5rem] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-white">
                  {lead.name && lead.name.length > 0 ? lead.name : "\u0411\u0435\u0437 \u0438\u043c\u0435\u043d\u0438"}
                </p>
                <a
                  href={`tel:${lead.phone}`}
                  className="mt-1 block break-all text-sm text-slate-300 transition hover:text-white"
                >
                  {lead.phone}
                </a>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
                  lead.status === "new"
                    ? "bg-[rgba(126,164,255,0.16)] text-[var(--chrome)]"
                    : "bg-[rgba(133,214,164,0.16)] text-emerald-200",
                )}
              >
                {LEAD_STATUS_LABELS[lead.status]}
              </span>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <div className="grid gap-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{"\u0423\u0441\u043b\u0443\u0433\u0430"}</span>
                <span className="break-words text-slate-200">{lead.service || "\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d\u043e"}</span>
              </div>
              <div className="grid gap-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{"\u041c\u043e\u0434\u0435\u043b\u044c"}</span>
                <span className="break-words text-slate-200">{lead.model || "\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d\u043e"}</span>
              </div>
              <div className="grid gap-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439"}</span>
                <p className="break-words leading-6 text-slate-400">
                  {lead.comment || "\u0411\u0435\u0437 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-slate-400">
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{"\u0414\u0430\u0442\u0430"}</span>
              <span className="text-right">{formatLeadDate(lead.created_at)}</span>
            </div>

            <div className="mt-4">
              <LeadRowActions lead={lead} />
            </div>
          </article>
        ))}
      </section>

      <section className="glass-panel metal-border hidden overflow-hidden rounded-[2rem] sm:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left">
            <thead className="bg-[rgba(255,255,255,0.04)] text-xs uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="px-5 py-4">{"\u041a\u043b\u0438\u0435\u043d\u0442"}</th>
                <th className="px-5 py-4">{"\u0423\u0441\u043b\u0443\u0433\u0430 \u0438 \u043c\u043e\u0434\u0435\u043b\u044c"}</th>
                <th className="px-5 py-4">{"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439"}</th>
                <th className="px-5 py-4">{"\u0421\u0442\u0430\u0442\u0443\u0441"}</th>
                <th className="px-5 py-4">{"\u0414\u0430\u0442\u0430"}</th>
                <th className="px-5 py-4">{"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044f"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {leads.map((lead) => (
                <tr key={lead.id} className="align-top">
                  <td className="px-5 py-5">
                    <div className="grid gap-2">
                      <p className="font-semibold text-white">
                        {lead.name && lead.name.length > 0 ? lead.name : "\u0411\u0435\u0437 \u0438\u043c\u0435\u043d\u0438"}
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
                      <span>{lead.service || "\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d\u043e"}</span>
                      <span className="text-slate-500">
                        {"\u041c\u043e\u0434\u0435\u043b\u044c:"} {lead.model || "\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d\u043e"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm leading-7 text-slate-400">
                    {lead.comment || "\u0411\u0435\u0437 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f"}
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
    </>
  );
}
