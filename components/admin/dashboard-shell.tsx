import { BarChart3, LogOut, Search } from "lucide-react";
import type { ReactNode } from "react";

import { logoutAction } from "@/app/actions";
import { MobileFiltersPanel } from "@/components/admin/mobile-filters-panel";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { CONTACT_INFO, LEAD_STATUS_OPTIONS, SERVICE_OPTIONS } from "@/lib/constants";

interface DashboardShellProps {
  children: ReactNode;
  counts: {
    total: number;
    new: number;
    processed: number;
  };
  filters: {
    query: string;
    status: string;
    service: string;
  };
}

export function DashboardShell({ children, counts, filters }: DashboardShellProps) {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:gap-8">
        <header className="glass-panel metal-border flex flex-col gap-4 rounded-[1.5rem] px-4 py-4 sm:gap-6 sm:rounded-[2rem] sm:px-6 sm:py-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Volvo Titan CRM</p>
            <h1 className="mt-2 font-heading text-2xl text-white sm:mt-3 sm:text-3xl">
              {"\u0417\u0430\u044f\u0432\u043a\u0438 \u0430\u0432\u0442\u043e\u0441\u0435\u0440\u0432\u0438\u0441\u0430"}
            </h1>
            <p className="mt-3 hidden max-w-2xl text-sm leading-7 text-slate-400 sm:block">
              {
                "\u0412\u0441\u044f \u0432\u0445\u043e\u0434\u044f\u0449\u0430\u044f \u043b\u0438\u0434\u043e\u0433\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u044f \u0441 \u0441\u0430\u0439\u0442\u0430 \u0441\u043a\u043b\u0430\u0434\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u0441\u044e\u0434\u0430. \u041c\u0435\u043d\u044f\u0439\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441, \u0438\u0449\u0438\u0442\u0435 \u043f\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443, \u043c\u043e\u0434\u0435\u043b\u0438 \u0438\u043b\u0438 \u0443\u0441\u043b\u0443\u0433\u0435 \u0438 \u0434\u0435\u0440\u0436\u0438\u0442\u0435 \u043e\u0442\u0432\u0435\u0442\u044b \u043a\u043b\u0438\u0435\u043d\u0442\u0430\u043c \u043f\u043e\u0434 \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0435\u043c."
              }
            </p>
          </div>
          <div className="grid gap-2 sm:flex sm:items-center sm:gap-3">
            <a
              href="/admin/reviews"
              className="rounded-xl border border-white/10 px-4 py-2.5 text-center text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              Отзывы
            </a>
            <a
              href={CONTACT_INFO.phoneHref}
              className="rounded-full border border-white/10 px-4 py-2.5 text-center text-sm text-slate-200 transition hover:border-white/20 hover:text-white sm:py-3"
            >
              <span className="flex flex-col gap-2 leading-none">
                <span className="text-[0.95rem] font-semibold text-white">
                  {CONTACT_INFO.phoneDisplay}
                </span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-300">
                  {CONTACT_INFO.phoneContactName}
                </span>
              </span>
            </a>
            <form action={logoutAction}>
              <Button variant="ghost" type="submit" className="w-full sm:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                {"\u0412\u044b\u0439\u0442\u0438"}
              </Button>
            </form>
          </div>
        </header>
        <section className="grid gap-3 sm:gap-4 md:grid-cols-3">
          <div className="glass-panel metal-border rounded-[1.4rem] p-4 sm:rounded-[1.75rem] sm:p-5">
            <p className="text-sm text-slate-400">{"\u0412\u0441\u0435\u0433\u043e \u0437\u0430\u044f\u0432\u043e\u043a"}</p>
            <p className="mt-2 font-heading text-2xl text-white sm:mt-3 sm:text-3xl">{counts.total}</p>
          </div>
          <div className="glass-panel metal-border rounded-[1.4rem] p-4 sm:rounded-[1.75rem] sm:p-5">
            <p className="text-sm text-slate-400">{"\u041d\u043e\u0432\u044b\u0435"}</p>
            <p className="mt-2 font-heading text-2xl text-white sm:mt-3 sm:text-3xl">{counts.new}</p>
          </div>
          <div className="glass-panel metal-border rounded-[1.4rem] p-4 sm:rounded-[1.75rem] sm:p-5">
            <p className="text-sm text-slate-400">{"\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u043d\u044b\u0435"}</p>
            <p className="mt-2 font-heading text-2xl text-white sm:mt-3 sm:text-3xl">{counts.processed}</p>
          </div>
        </section>
        <section className="glass-panel metal-border rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-5">
          <MobileFiltersPanel>
            <form className="grid gap-3 sm:gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto] lg:items-end">
              <label className="grid gap-2 text-sm text-slate-300">
                {"\u041f\u043e\u0438\u0441\u043a"}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    name="q"
                    defaultValue={filters.query}
                    placeholder={
                      "\u0418\u043c\u044f, \u0442\u0435\u043b\u0435\u0444\u043e\u043d, \u043c\u043e\u0434\u0435\u043b\u044c, \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439"
                    }
                    className="h-11 w-full rounded-[1.15rem] border border-white/10 bg-[rgba(255,255,255,0.06)] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/30 sm:h-12 sm:rounded-2xl"
                  />
                </div>
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                {"\u0421\u0442\u0430\u0442\u0443\u0441"}
                <Select
                  id="admin-status-filter"
                  name="status"
                  defaultValue={filters.status}
                  options={LEAD_STATUS_OPTIONS}
                  placeholder={"\u0412\u0441\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u044b"}
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                {"\u0423\u0441\u043b\u0443\u0433\u0430"}
                <Select
                  id="admin-service-filter"
                  name="service"
                  defaultValue={filters.service}
                  options={[{ value: "all", label: "\u0412\u0441\u0435 \u0443\u0441\u043b\u0443\u0433\u0438" }, ...SERVICE_OPTIONS]}
                  placeholder={"\u0412\u0441\u0435 \u0443\u0441\u043b\u0443\u0433\u0438"}
                />
              </label>
              <Button type="submit" variant="secondary" className="w-full lg:w-auto">
                <BarChart3 className="mr-2 h-4 w-4" />
                {"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c"}
              </Button>
            </form>
          </MobileFiltersPanel>
        </section>
        {children}
      </div>
    </div>
  );
}
