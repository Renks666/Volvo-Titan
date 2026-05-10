import type { LandingPageConfig } from "@/lib/landing-pages";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/section-heading";

type Props = {
  pricing: NonNullable<LandingPageConfig["pricing"]>;
};

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

export function PriceTableSection({ pricing }: Props) {
  return (
    <section id="pricing" className="scroll-mt-28 px-0 pb-[var(--landing-section-space)] md:scroll-mt-36 md:pb-20">
      <div className="section-shell">
        <Reveal>
          <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} />

          <div className="mt-8 flex flex-col gap-5">
            {pricing.categories.map((cat) => (
              <div
                key={cat.label}
                className="glass-panel metal-border overflow-clip rounded-[var(--landing-card-radius)] sm:rounded-2xl"
              >
                {/* Category label */}
                <div className="border-b border-white/10 bg-white/[0.03] px-6 py-5 sm:px-8">
                  <p className="font-heading text-base font-semibold text-white sm:text-lg">
                    {cat.label}
                  </p>
                </div>

                {/* Scrollable table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-sm">
                    <colgroup>
                      <col className="w-full" />
                      <col style={{ width: "7rem", minWidth: "7rem" }} />
                      {cat.columns.map((col) => (
                        <col key={col} style={{ width: "6rem", minWidth: "6rem" }} />
                      ))}
                    </colgroup>
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-4 pl-8 pr-4 text-left text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--highlight)]">
                          Вид работ
                        </th>
                        <th className="py-4 px-3 text-left text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--highlight)]">
                          Ед.&nbsp;изм.
                        </th>
                        {cat.columns.map((col, ci) => (
                          <th
                            key={col}
                            className={`py-4 pl-3 text-right font-mono text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[var(--highlight)] ${ci === cat.columns.length - 1 ? "pr-8" : "pr-3"}`}
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cat.rows.map((row, i) => (
                        <tr
                          key={row.label}
                          className={
                            row.highlight
                              ? "bg-[var(--highlight)]/[0.06]"
                              : i % 2 === 0
                                ? "bg-white/[0.015]"
                                : ""
                          }
                        >
                          <td className="py-4 pl-8 pr-4 text-left leading-snug">
                            <span
                              className={
                                row.highlight
                                  ? "font-semibold text-white"
                                  : "text-slate-300"
                              }
                            >
                              {row.label}
                            </span>
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-left text-xs text-slate-500">
                            {row.unit}
                          </td>
                          {row.prices.map((price, pi) => (
                            <td
                              key={pi}
                              className={`whitespace-nowrap py-4 pl-3 text-right tabular-nums ${pi === row.prices.length - 1 ? "pr-8" : "pr-3"}`}
                            >
                              {price !== null ? (
                                <span
                                  className={
                                    row.highlight
                                      ? "font-semibold text-[var(--highlight)]"
                                      : "text-slate-200"
                                  }
                                >
                                  {fmt(price)}&nbsp;₽
                                </span>
                              ) : (
                                <span className="text-slate-600">—</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {pricing.footnotes && pricing.footnotes.length > 0 && (
            <ul className="mt-5 space-y-1.5 pl-1">
              {pricing.footnotes.map((note) => (
                <li key={note} className="text-xs leading-5 text-slate-500">
                  {note}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
