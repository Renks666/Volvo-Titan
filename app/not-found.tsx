import Link from "next/link";
import { CONTACT_INFO } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-panel metal-border mx-auto w-full max-w-md rounded-[2rem] px-8 py-12 text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--highlight)]">
          Ошибка 404
        </p>
        <h1 className="mt-3 font-heading text-3xl text-white">
          Страница не найдена
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-400">
          Эта страница не существует или была удалена. Возможно, ссылка устарела.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--highlight)] px-6 py-3 text-sm font-semibold text-[#050913] transition hover:bg-[var(--highlight)]/90"
          >
            На главную
          </Link>
          <a
            href={CONTACT_INFO.phoneHref}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/8"
          >
            {CONTACT_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
