import { BarChart3, LogOut, Search } from "lucide-react";
import type { ReactNode } from "react";

import { logoutAction } from "@/app/actions";
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
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto grid max-w-7xl gap-8">
        <header className="glass-panel metal-border flex flex-col gap-6 rounded-[2rem] px-6 py-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Volvo Titan CRM</p>
            <h1 className="mt-3 font-heading text-3xl text-white">Заявки автосервиса</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Вся входящая лидогенерация с сайта складывается сюда. Меняйте статус,
              ищите по телефону, модели или услуге и держите ответы клиентам под контролем.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={CONTACT_INFO.phoneHref}
              className="rounded-full border border-white/10 px-4 py-3 text-sm text-slate-200 transition hover:border-white/20 hover:text-white"
            >
              {CONTACT_INFO.phoneDisplay}
            </a>
            <form action={logoutAction}>
              <Button variant="ghost" type="submit">
                <LogOut className="mr-2 h-4 w-4" />
                Выйти
              </Button>
            </form>
          </div>
        </header>
        <section className="grid gap-4 md:grid-cols-3">
          <div className="glass-panel metal-border rounded-[1.75rem] p-5">
            <p className="text-sm text-slate-400">Всего заявок</p>
            <p className="mt-3 font-heading text-3xl text-white">{counts.total}</p>
          </div>
          <div className="glass-panel metal-border rounded-[1.75rem] p-5">
            <p className="text-sm text-slate-400">Новые</p>
            <p className="mt-3 font-heading text-3xl text-white">{counts.new}</p>
          </div>
          <div className="glass-panel metal-border rounded-[1.75rem] p-5">
            <p className="text-sm text-slate-400">Обработанные</p>
            <p className="mt-3 font-heading text-3xl text-white">{counts.processed}</p>
          </div>
        </section>
        <section className="glass-panel metal-border rounded-[2rem] p-5">
          <form className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto] lg:items-end">
            <label className="grid gap-2 text-sm text-slate-300">
              Поиск
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  name="q"
                  defaultValue={filters.query}
                  placeholder="Имя, телефон, модель, комментарий"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.06)] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/30"
                />
              </div>
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Статус
              <Select
                id="admin-status-filter"
                name="status"
                defaultValue={filters.status}
                options={LEAD_STATUS_OPTIONS}
                placeholder="Все статусы"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Услуга
              <Select
                id="admin-service-filter"
                name="service"
                defaultValue={filters.service}
                options={[{ value: "all", label: "Все услуги" }, ...SERVICE_OPTIONS]}
                placeholder="Все услуги"
              />
            </label>
            <Button type="submit" variant="secondary" className="w-full lg:w-auto">
              <BarChart3 className="mr-2 h-4 w-4" />
              Применить
            </Button>
          </form>
        </section>
        {children}
      </div>
    </div>
  );
}
