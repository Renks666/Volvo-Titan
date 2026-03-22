"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";

import { submitLeadAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SERVICE_OPTIONS } from "@/lib/constants";
import type { LeadFormValues } from "@/lib/types";
import { leadFormSchema } from "@/lib/validators";
import { trackCtaEvent } from "@/utils/analytics";

const defaultValues: LeadFormValues = {
  name: "",
  phone: "",
  service: "",
  comment: "",
};

export function LeadForm() {
  const [serverMessage, setServerMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit((values) => {
    setServerMessage(null);
    startTransition(async () => {
      const result = await submitLeadAction(values);

      if (result.success) {
        reset(defaultValues);
        setServerMessage({ type: "success", text: result.message });
        trackCtaEvent("lead_submit_success", { source: "landing_form" });
        return;
      }

      setServerMessage({ type: "error", text: result.message });
    });
  });

  return (
    <form id="lead-form" className="grid gap-4 scroll-mt-32" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-300">
          Имя
          <Input placeholder="Как к вам обращаться" {...register("name")} />
          {errors.name ? <span className="text-xs text-rose-300">{errors.name.message}</span> : null}
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Телефон *
          <Input placeholder="+7 (___) ___-__-__" {...register("phone")} />
          {errors.phone ? <span className="text-xs text-rose-300">{errors.phone.message}</span> : null}
        </label>
      </div>
      <label className="grid gap-2 text-sm text-slate-300">
        Услуга
        <Select {...register("service")}>
          <option value="" className="bg-slate-950">
            Выберите услугу
          </option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-slate-950">
              {option.label}
            </option>
          ))}
        </Select>
      </label>
      <label className="grid gap-2 text-sm text-slate-300">
        Комментарий
        <Textarea
          placeholder="Опишите симптомы, модель Volvo или удобное время для звонка"
          {...register("comment")}
        />
        {errors.comment ? (
          <span className="text-xs text-rose-300">{errors.comment.message}</span>
        ) : null}
      </label>
      {serverMessage ? (
        <div
          className={
            serverMessage.type === "success"
              ? "rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"
              : "rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100"
          }
        >
          {serverMessage.text}
        </div>
      ) : null}
      <Button
        type="submit"
        className="w-full md:w-auto"
        disabled={isPending}
        onClick={() => trackCtaEvent("lead_cta_click", { location: "cta_form_submit" })}
      >
        {isPending ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Отправляем
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Оставить заявку
          </>
        )}
      </Button>
    </form>
  );
}
