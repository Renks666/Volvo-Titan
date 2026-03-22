import { TRUST_METRICS } from "@/lib/constants";

export function TrustStrip() {
  return (
    <section className="px-6 py-8 md:py-10">
      <div className="section-shell">
        <div className="glass-panel metal-border grid gap-4 rounded-[2rem] p-6 md:grid-cols-4">
          {TRUST_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[1.5rem] border border-white/10 bg-black/15 p-5"
            >
              <p className="font-heading text-2xl text-white">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
