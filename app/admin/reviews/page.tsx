import type { Metadata } from "next";
import { LogOut, Plus } from "lucide-react";

import { createReviewAction, logoutAction } from "@/app/actions";
import { ReviewsTable } from "@/components/admin/reviews-table";
import { Button } from "@/components/ui/button";
import { requireAdminSession } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ReviewRecord } from "@/lib/types";

export const metadata: Metadata = {
  title: "Отзывы",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  await requireAdminSession();

  const supabase = createSupabaseAdminClient();
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .order("review_date", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:gap-8">

        {/* Header */}
        <header className="glass-panel metal-border flex flex-col gap-4 rounded-[1.5rem] px-4 py-4 sm:gap-6 sm:rounded-[2rem] sm:px-6 sm:py-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Volvo Titan CRM</p>
            <h1 className="mt-2 font-heading text-2xl text-white sm:mt-3 sm:text-3xl">
              Управление отзывами
            </h1>
            <p className="mt-3 hidden text-sm leading-7 text-slate-400 sm:block">
              Добавляйте реальные отзывы с Яндекс.Карт. До 5 последних показываются на сайте.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/leads"
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              Заявки
            </a>
            <form action={logoutAction}>
              <Button variant="ghost" type="submit">
                <LogOut className="mr-2 h-4 w-4" />
                Выйти
              </Button>
            </form>
          </div>
        </header>

        {/* Stats */}
        <section className="grid gap-3 sm:gap-4 md:grid-cols-3">
          <div className="glass-panel metal-border rounded-[1.4rem] p-4 sm:rounded-[1.75rem] sm:p-5">
            <p className="text-sm text-slate-400">Всего отзывов</p>
            <p className="mt-2 font-heading text-2xl text-white sm:mt-3 sm:text-3xl">
              {reviews?.length ?? 0}
            </p>
          </div>
          <div className="glass-panel metal-border rounded-[1.4rem] p-4 sm:rounded-[1.75rem] sm:p-5">
            <p className="text-sm text-slate-400">Видны на сайте</p>
            <p className="mt-2 font-heading text-2xl text-white sm:mt-3 sm:text-3xl">
              {reviews?.filter((r) => r.is_visible).length ?? 0}
            </p>
          </div>
          <div className="glass-panel metal-border rounded-[1.4rem] p-4 sm:rounded-[1.75rem] sm:p-5">
            <p className="text-sm text-slate-400">Показывается на сайте</p>
            <p className="mt-2 font-heading text-2xl text-white sm:mt-3 sm:text-3xl">
              до 5
            </p>
          </div>
        </section>

        {/* Add review form */}
        <section className="glass-panel metal-border rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Добавить отзыв
          </h2>
          <form action={createReviewAction} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="grid gap-2 text-sm text-slate-300">
              Имя автора *
              <input
                name="author_name"
                required
                placeholder="Андрей К."
                className="h-11 rounded-[1.15rem] border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/30"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Модель авто
              <input
                name="vehicle_model"
                placeholder="XC90 2021"
                className="h-11 rounded-[1.15rem] border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/30"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Оценка *
              <select
                name="rating"
                defaultValue="5"
                required
                className="h-11 rounded-[1.15rem] border border-white/10 bg-[#0d1525] px-4 text-sm text-white outline-none transition focus:border-white/30"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {"★".repeat(n)} ({n})
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-slate-300 sm:col-span-2 lg:col-span-2">
              Текст отзыва *
              <textarea
                name="review_text"
                required
                rows={3}
                placeholder="Скопируй текст реального отзыва с Яндекс.Карт..."
                className="resize-none rounded-[1.15rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/30"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Дата отзыва *
              <input
                name="review_date"
                type="date"
                required
                className="h-11 rounded-[1.15rem] border border-white/10 bg-[#0d1525] px-4 text-sm text-white outline-none transition focus:border-white/30"
              />
            </label>
            <div className="flex items-end sm:col-span-2 lg:col-span-3">
              <Button type="submit" className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Добавить отзыв
              </Button>
            </div>
          </form>
        </section>

        {/* Reviews list */}
        <ReviewsTable reviews={(reviews ?? []) as ReviewRecord[]} />

      </div>
    </div>
  );
}
