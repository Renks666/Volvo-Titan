"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, Star, Trash2 } from "lucide-react";

import { deleteReviewAction, toggleReviewVisibilityAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import type { ReviewRecord } from "@/lib/types";

export function ReviewsTable({ reviews }: { reviews: ReviewRecord[] }) {
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleToggle = (id: string, current: boolean) => {
    setPendingId(id);
    startTransition(async () => {
      await toggleReviewVisibilityAction(id, !current);
      setPendingId(null);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Удалить отзыв? Это действие нельзя отменить.")) return;
    setPendingId(id);
    startTransition(async () => {
      await deleteReviewAction(id);
      setPendingId(null);
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="glass-panel metal-border rounded-[1.5rem] p-8 text-center text-sm text-slate-400 sm:rounded-[2rem]">
        Отзывов пока нет. Добавьте первый через форму выше.
      </div>
    );
  }

  return (
    <div className="glass-panel metal-border overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              <th className="px-5 py-4">Автор / Авто</th>
              <th className="px-5 py-4">Отзыв</th>
              <th className="px-5 py-4">Оценка</th>
              <th className="px-5 py-4">Дата</th>
              <th className="px-5 py-4">Статус</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {reviews.map((review) => (
              <tr
                key={review.id}
                className={`transition-colors hover:bg-white/[0.02] ${!review.is_visible ? "opacity-50" : ""}`}
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-white">{review.author_name}</p>
                  {review.vehicle_model && (
                    <p className="mt-0.5 text-xs text-slate-500">{review.vehicle_model}</p>
                  )}
                </td>
                <td className="max-w-xs px-5 py-4">
                  <p className="line-clamp-2 text-slate-300">{review.review_text}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-700"}`}
                      />
                    ))}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                  {new Date(review.review_date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      review.is_visible
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "bg-slate-400/10 text-slate-400"
                    }`}
                  >
                    {review.is_visible ? "Виден" : "Скрыт"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isPending && pendingId === review.id}
                      onClick={() => handleToggle(review.id, review.is_visible)}
                      title={review.is_visible ? "Скрыть" : "Показать"}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-white/20 hover:text-white disabled:opacity-40"
                    >
                      {review.is_visible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={isPending && pendingId === review.id}
                      onClick={() => handleDelete(review.id)}
                      title="Удалить"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/[0.06] text-rose-400 transition hover:border-rose-500/40 hover:bg-rose-500/10 disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
