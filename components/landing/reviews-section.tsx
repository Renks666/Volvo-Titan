import { ExternalLink, Star } from "lucide-react";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ReviewRecord, YandexOrgRating } from "@/lib/types";
import { fetchYandexOrgRating } from "@/lib/yandex";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const REVIEWS_EXTERNAL_URL = "https://yandex.com/maps/-/CPvunM12";

async function getReviews(): Promise<ReviewRecord[]> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_visible", true)
      .order("review_date", { ascending: false })
      .limit(4);

    if (error) throw error;
    return (data ?? []) as ReviewRecord[];
  } catch {
    return [];
  }
}

function RatingBadge({ rating }: { rating: YandexOrgRating }) {
  return (
    <a
      href={REVIEWS_EXTERNAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-1 inline-flex shrink-0 items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-2 text-sm text-amber-300 transition-colors hover:border-amber-400/35 hover:bg-amber-400/10"
    >
      <span className="font-semibold">{rating.value.toFixed(1)}</span>
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${i < Math.round(rating.value) ? "fill-amber-400 text-amber-400" : "text-amber-400/30"}`}
          />
        ))}
      </span>
      {rating.count > 0 && (
        <span className="text-amber-300/70">· {rating.count} отзывов</span>
      )}
      <span className="text-amber-300/50">на Яндекс.Картах</span>
      <ExternalLink className="h-3 w-3 opacity-50" />
    </a>
  );
}

function ReviewCard({ review, index }: { review: ReviewRecord; index: number }) {
  return (
    <Reveal delay={index * 0.08}>
      <article className="glass-panel metal-border flex h-full flex-col rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] sm:rounded-[2rem] sm:p-6">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-700 text-slate-700"}`}
            />
          ))}
        </div>
        <p className="mt-4 flex-1 text-sm leading-6 text-slate-300 sm:leading-7">
          &ldquo;{review.review_text}&rdquo;
        </p>
        <div className="mt-5 border-t border-white/8 pt-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white">{review.author_name}</p>
            <p className="text-xs text-slate-500">
              {new Date(review.review_date).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          {review.vehicle_model && (
            <p className="mt-1 text-xs font-medium text-slate-400">{review.vehicle_model}</p>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export async function ReviewsSection() {
  const [reviews, rating] = await Promise.all([getReviews(), fetchYandexOrgRating()]);

  return (
    <section id="reviews" className="px-0 py-[var(--landing-section-space)] md:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Отзывы" title="Что говорят владельцы Volvo" />
          {rating && <RatingBadge rating={rating} />}
        </div>

        {reviews.length > 0 ? (
          <div className="mt-7 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-slate-500">
            Отзывы появятся здесь после добавления в&nbsp;
            <a href="/admin/reviews" className="underline hover:text-slate-300">
              панели управления
            </a>
            .
          </p>
        )}

        <div className="mt-6 flex justify-center sm:mt-8">
          <a
            href={REVIEWS_EXTERNAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-slate-400 transition-colors hover:border-white/20 hover:text-slate-200"
          >
            Все отзывы на Яндекс.Картах
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
