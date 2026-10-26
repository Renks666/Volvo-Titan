import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика обработки персональных данных Volvo Titan.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="px-4 py-10 sm:py-16">
      <div className="section-shell max-w-3xl">
        <Link
          href="/"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← На главную
        </Link>

        <div className="glass-panel metal-border mt-6 rounded-[var(--landing-card-radius)] p-[var(--landing-card-padding-lg)] sm:rounded-[1.5rem] sm:p-10">
          <h1 className="font-heading text-2xl text-white sm:text-4xl">
            Политика конфиденциальности
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Временный текст. Перед публикацией замените его согласованной редакцией.
          </p>

          <div className="mt-8 grid gap-6 text-sm leading-7 text-slate-300 sm:text-base">
            <section>
              <h2 className="font-heading text-lg text-white sm:text-xl">1. Общие положения</h2>
              <p className="mt-2">
                Настоящая политика описывает, как Volvo Titan (далее — «Сервис») обрабатывает
                персональные данные посетителей сайта и лиц, оставивших заявку.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg text-white sm:text-xl">2. Какие данные мы собираем</h2>
              <p className="mt-2">
                Имя и номер телефона, которые вы указываете в форме заявки, а также, если вы их
                сообщили, модель автомобиля, выбранная услуга и комментарий.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg text-white sm:text-xl">3. Цели обработки</h2>
              <p className="mt-2">
                Связаться с вами по заявке, уточнить задачу и записать на обслуживание.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg text-white sm:text-xl">4. Хранение и передача</h2>
              <p className="mt-2">
                Данные хранятся только для обработки заявки и не передаются третьим лицам, за
                исключением случаев, предусмотренных законодательством.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg text-white sm:text-xl">5. Ваши права</h2>
              <p className="mt-2">
                Вы можете отозвать согласие и потребовать удаления данных, связавшись с нами по
                телефону, указанному на сайте.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg text-white sm:text-xl">6. Реквизиты оператора</h2>
              <p className="mt-2">[Наименование, ИНН/ОГРН, адрес — будут добавлены владельцем]</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
