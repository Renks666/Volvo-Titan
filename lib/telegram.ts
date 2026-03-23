import { formatTelegramDate, normalizeOptionalText } from "@/lib/format";
import type { LeadFormValues } from "@/lib/types";

export async function sendTelegramLeadNotification(
  payload: LeadFormValues & { createdAt: string },
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false as const, skipped: true as const };
  }

  const message = [
    "🚗 Новая заявка!",
    "",
    `Имя: ${normalizeOptionalText(payload.name)}`,
    `Телефон: ${payload.phone}`,
    `Модель: ${normalizeOptionalText(payload.model)}`,
    `Услуга: ${normalizeOptionalText(payload.service)}`,
    `Комментарий: ${normalizeOptionalText(payload.comment)}`,
    `Дата: ${formatTelegramDate(payload.createdAt)}`,
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${responseText}`);
  }

  return { ok: true as const, skipped: false as const };
}
