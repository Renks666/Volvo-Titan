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
    "https://t.me/volvo_titan?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%B2%20Volvo%20Titan.",
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
  { href: "#works", label: "Наши работы" },
  { href: "#lead", label: "Запись" },
  { href: "#contacts", label: "Контакты" },
] as const;

export const BENEFITS = [
  {
    title: "Только Volvo",
    description:
      "Специализация на одной марке — глубокое знание каждой модели XC, S и V серий без долгих экспериментов.",
  },
  {
    title: "Опыт с 1995 года",
    description:
      "30 лет на Volvo. Мастера знают марку до последнего датчика и умеют читать машину без лишних вопросов.",
  },
  {
    title: "Никакого навязывания",
    description:
      "Называем только реально необходимые работы. Вы принимаете решение — мы делаем. Без давления.",
  },
  {
    title: "Гарантия на работы",
    description:
      "Письменная гарантия на все выполненные ремонты. Остаёмся на связи, если потребуется контроль.",
  },
  {
    title: "Быстрый старт",
    description:
      "Принимаем в течение 1 рабочего дня после записи. Не теряйте неделю в очереди к дилеру.",
  },
  {
    title: "Прозрачная цена",
    description:
      "Стоимость согласуем до начала работ. Без скрытых доплат и неожиданных счётов при выдаче.",
  },
];

export const TRUST_METRICS = [
  { value: "30+", label: "лет опыта с Volvo" },
  { value: "5000+", label: "авто обслужено" },
  { value: "БЕСПЛАТНО", label: "диагностика при записи" },
  { value: "100%", label: "прозрачный расчёт" },
] as const;

export const SERVICES = [
  {
    slug: "computer-diagnostics",
    name: "Компьютерная диагностика",
    price: "БЕСПЛАТНО",
    badge: "free" as const,
    description:
      "Сканируем все блоки управления, показываем ошибки и объясняем причины простым языком.",
  },
  {
    slug: "maintenance",
    name: "ТО",
    price: "от 800 ₽",
    description:
      "Обслуживание по регламенту без лишних работ. Все жидкости, фильтры и расходники.",
  },
  {
    slug: "suspension-diagnostics",
    name: "Диагностика ходовой",
    price: "от 1 500 ₽",
    description:
      "Находим люфты, стуки и износ до того, как мелкая проблема превратится в дорогой ремонт.",
  },
  {
    slug: "chassis-repair",
    name: "Ремонт ходовой",
    price: "от 2 500 ₽",
    description:
      "Амортизаторы, рычаги, ступичные подшипники. Подвеска — тишина и уверенность на дороге.",
  },
  {
    slug: "electrician",
    name: "Электрика",
    price: "от 1 500 ₽",
    description:
      "Находим даже плавающие неисправности. Устраняем причину, а не только внешние симптомы.",
  },
  {
    slug: "cem-repair",
    name: "Ремонт блоков CEM",
    price: "по запросу",
    description:
      "Восстанавливаем блоки CEM, когда проблема кроется в электронике, а не во внешних симптомах.",
  },
  {
    slug: "abs-repair",
    name: "Ремонт блоков ABS",
    price: "по запросу",
    description:
      "Ремонт блоков ABS с поиском причины ошибок — корректная работа тормозов и электроники.",
  },
  {
    slug: "unit-replacement",
    name: "Замена агрегатов",
    price: "по запросу",
    description:
      "Подберём разумное решение под состояние автомобиля и ваш бюджет. Без навязывания.",
  },
  {
    slug: "unit-rebuild",
    name: "Переборка агрегатов",
    price: "по запросу",
    description:
      "Восстановим агрегат, когда ремонт выгоднее полной замены. Честная оценка ресурса.",
  },
  {
    slug: "tire-service",
    name: "Шиномонтаж",
    price: "по запросу",
    description:
      "Быстро и бережно переобуем автомобиль. Сохраним диски, баланс и комфорт в движении.",
  },
  {
    slug: "bodywork",
    name: "Кузовной ремонт",
    price: "по запросу",
    description:
      "Локальное восстановление без покраски всей панели. Геометрия и внешний вид — как было.",
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
  sectionTitle: "Не откладывайте — запишитесь сегодня",
  sectionSubtitle:
    "Мелкая проблема становится дорогой, если её игнорировать. Диагностика бесплатна — оставьте заявку, и мы перезвоним в течение 15 минут.",
};
