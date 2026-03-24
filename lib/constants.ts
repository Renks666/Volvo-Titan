import type { LeadStatus } from "@/lib/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://volvo-titan.ru";

const YANDEX_MAPS_ADDRESS_QUERY = encodeURIComponent(
  "Москва, ул. Измайловского Зверинца 8, подъезд 1А",
);

export const CONTACT_INFO = {
  companyName: "Volvo Titan",
  heroTitle: "Ремонт Volvo в Москве с 1995 года",
  heroSubtitle:
    "Узкая специализация на Volvo, честная диагностика и ремонт без навязывания лишних работ.",
  phoneContactName: "Антон",
  phoneDisplay: "+7 910 454 14 19",
  phoneDigits: "79104541419",
  phoneHref: "tel:+79104541419",
  address: "Москва, ул. Измайловского Зверинца 8, подъезд 1А",
  workHours: [
    { label: "Пн-Пт", value: "10:00-20:00" },
    { label: "Сб", value: "10:00-15:00" },
  ],
  whatsappUrl:
    "https://wa.me/79104541419?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%B2%20Volvo%20Titan.",
  telegramUrl:
    process.env.NEXT_PUBLIC_TELEGRAM_CONTACT_URL ||
    "https://t.me/share/url?url=https%3A%2F%2Fvolvo-titan.ru&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%B2%20Volvo%20Titan.",
  mapEmbedUrl:
    "https://yandex.ru/map-widget/v1/?um=constructor%3A9f0d122dce0d58d1596c73e93fefd9d9f31c72d65a821d34016b2b8680f0d18f&source=constructor",
  mapTitle: "Volvo Titan на карте",
  mapHint: "Volvo Titan. Специализированный сервис Volvo в Москве.",
  mapZoom: 16,
  mapOpenUrl: `https://yandex.ru/maps/?text=${YANDEX_MAPS_ADDRESS_QUERY}&z=16`,
  coordinates: {
    latitude: 55.788934,
    longitude: 37.760153,
  },
};

export const NAV_ITEMS = [
  { href: "#benefits", label: "Преимущества" },
  { href: "#services", label: "Услуги" },
  { href: "#lead", label: "Запись" },
  { href: "#contacts", label: "Контакты" },
] as const;

export const BENEFITS = [
  {
    title: "Опыт с 1995 года",
    description:
      "Работаем с Volvo почти 30 лет и знаем типовые болячки моделей без долгих экспериментов.",
  },
  {
    title: "Узкая специализация Volvo",
    description:
      "Фокус только на марке помогает быстрее находить причину неисправности и предлагать точный ремонт.",
  },
  {
    title: "Минимальная очередь",
    description:
      "Организуем прием так, чтобы вы не теряли неделю на ожидание и могли заранее понимать сроки.",
  },
  {
    title: "Гарантия на работы",
    description:
      "Фиксируем результат и остаемся на связи после ремонта, если понадобится контрольный осмотр.",
  },
] as const;

export const TRUST_METRICS = [
  { value: "30+", label: "лет опыта" },
  { value: "1 день", label: "средний старт работ" },
  { value: "Volvo only", label: "узкая специализация" },
  { value: "100%", label: "прозрачный расчет" },
] as const;

export const SERVICES = [
  {
    slug: "suspension-diagnostics",
    name: "Диагностика ходовой",
    price: "1500 ₽",
    description:
      "Найдем люфты, стуки и износ до того, как мелкая проблема превратится в дорогой ремонт.",
  },
  {
    slug: "computer-diagnostics",
    name: "Компьютерная диагностика",
    price: "1500 ₽",
    description:
      "Считаем ошибки, проверим системы, выполним прошивки и перепрошивки блоков, пересвет панели приборов и русификацию щитков приборов.",
  },
  {
    slug: "cem-repair",
    name: "Ремонт блоков CEM",
    price: "по запросу",
    description:
      "Диагностируем и восстановим блоки CEM, когда проблема кроется в электронике, а не только во внешних симптомах.",
  },
  {
    slug: "abs-repair",
    name: "Ремонт блоков ABS",
    price: "по запросу",
    description:
      "Ремонтируем блоки ABS с поиском причины ошибок, чтобы вернуть корректную работу тормозной системы и связанной электроники.",
  },
  {
    slug: "maintenance",
    name: "ТО",
    price: "от 800 ₽",
    description:
      "Проведем обслуживание Volvo без лишних работ, чтобы машина оставалась надежной каждый день.",
  },
  {
    slug: "unit-replacement",
    name: "Замена агрегатов",
    price: "по запросу",
    description:
      "Аккуратно заменим узел и подберем разумное решение под состояние автомобиля и ваш бюджет.",
  },
  {
    slug: "unit-rebuild",
    name: "Переборка агрегатов",
    price: "по запросу",
    description:
      "Восстановим агрегат с пониманием ресурса, когда ремонт выгоднее поспешной полной замены.",
  },
  {
    slug: "chassis-repair",
    name: "Ремонт ходовой",
    price: "по запросу",
    description:
      "Вернем подвеске собранность, тишину и уверенное поведение автомобиля на любой дороге.",
  },
  {
    slug: "tire-service",
    name: "Шиномонтаж",
    price: "по запросу",
    description:
      "Быстро и бережно переобуем автомобиль, чтобы сохранить диски, баланс и комфорт в движении.",
  },
  {
    slug: "electrician",
    name: "Электрика",
    price: "по запросу",
    description:
      "Найдем даже плавающие неисправности и устраним причину, а не только внешние симптомы.",
  },
  {
    slug: "bodywork",
    name: "Кузовной ремонт",
    price: "по запросу",
    description:
      "Аккуратно восстановим кузов, геометрию и внешний вид, чтобы машина снова выглядела достойно.",
  },
] as const;

export const SERVICE_OPTIONS: Array<{ value: string; label: string }> = [
  ...SERVICES.map((service) => ({
    value: service.name,
    label: service.name,
  })),
  { value: "Другое", label: "Другое" },
];

export const VOLVO_MODEL_OPTIONS = [
  "XC90",
  "XC60",
  "XC70",
  "XC40",
  "S60",
  "S80",
  "S90",
  "V40",
  "V60",
  "V70",
  "V90",
  "C30",
  "C70",
  "Другая модель",
].map((model) => ({
  value: model,
  label: model,
}));

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Новая",
  processed: "Обработана",
};

export const LEAD_STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "new", label: "Новые" },
  { value: "processed", label: "Обработанные" },
] as const;

export const CTA_COPY = {
  sectionTitle: "Оставьте заявку и мы свяжемся с вами",
  sectionSubtitle:
    "Подскажем по симптомам, уточним сроки и предложим ближайшее окно на диагностику или ремонт.",
};
