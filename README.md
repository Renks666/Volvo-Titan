# Volvo Titan

Премиальный landing page + CRM-админка для автосервиса Volvo Titan на `Next.js`, `Supabase` и `Telegram Bot API`.

## Stack

- `Next.js 16` + `App Router`
- `TypeScript`
- `Tailwind CSS 4`
- `Supabase` (`DB`, `Auth`, `RLS`)
- `React Hook Form` + `Zod`
- `Framer Motion`

## Features

- Конверсионный лендинг с premium mobile-first UI
- Sticky/floating CTA для звонка и заявки
- Server Action для приема заявок
- Сохранение лида в `Supabase`
- Telegram-уведомление о новой заявке
- CRM-админка с логином через `Supabase Auth`
- Фильтрация, смена статуса и удаление заявок
- SEO metadata + `schema.org`

## Local Run

1. Установите зависимости:

```bash
npm install
```

2. Скопируйте `.env.example` в `.env.local` и заполните переменные.

3. Примените SQL из `supabase/migrations/001_init.sql` в Supabase SQL Editor.

4. Создайте администратора вручную в `Supabase Auth`.

5. Запустите dev-сервер:

```bash
npm run dev
```

## Environment

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `NEXT_PUBLIC_TELEGRAM_CONTACT_URL`

## CRM Routes

- `/admin/login`
- `/admin/leads`
