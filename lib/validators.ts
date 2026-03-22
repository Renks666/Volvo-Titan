import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().trim().max(120, "Слишком длинное имя"),
  phone: z
    .string()
    .trim()
    .min(6, "Укажите телефон")
    .max(32, "Слишком длинный номер"),
  service: z.string().trim().max(120, "Слишком длинное название услуги"),
  comment: z
    .string()
    .trim()
    .max(1000, "Комментарий слишком длинный"),
});

export const adminSignInSchema = z.object({
  email: z.string().trim().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export const leadStatusSchema = z.enum(["new", "processed"]);
