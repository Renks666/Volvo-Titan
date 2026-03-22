export function formatLeadDate(dateValue: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Moscow",
  }).format(new Date(dateValue));
}

export function formatTelegramDate(dateValue: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Europe/Moscow",
  }).format(new Date(dateValue));
}

export function normalizeOptionalText(value: string | null | undefined) {
  return value && value.trim().length > 0 ? value.trim() : "Не указано";
}
