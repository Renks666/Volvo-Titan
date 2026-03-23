import { z } from "zod";

const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export const leadFormSchema = z.object({
  name: z.string().trim().max(120, "Слишком длинное имя"),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Укажите телефон в формате +7 (999) 123-45-67"),
  model: z.string().trim().max(120, "Слишком длинное название модели"),
  service: z.string().trim().max(120, "Слишком длинное название услуги"),
  comment: z.string().trim().max(1000, "Комментарий слишком длинный"),
});

export const adminSignInSchema = z.object({
  email: z.string().trim().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export const leadStatusSchema = z.enum(["new", "processed"]);
