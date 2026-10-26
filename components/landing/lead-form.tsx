"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Phone } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { submitLeadAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_INFO, SERVICE_OPTIONS, VOLVO_MODEL_OPTIONS } from "@/lib/constants";
import type { LeadFormValues } from "@/lib/types";
import { leadFormSchema } from "@/lib/validators";
import { trackCtaEvent } from "@/utils/analytics";

const PHONE_MASK_TEMPLATE = "+7 (___) ___-__-__";
const PHONE_DIGITS_LIMIT = 10;

const defaultValues: LeadFormValues = {
  name: "",
  phone: PHONE_MASK_TEMPLATE,
  model: "",
  service: "",
  comment: "",
  consent: false,
};

function extractPhoneDigits(value: string) {
  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.startsWith("7") || digitsOnly.startsWith("8")) {
    return digitsOnly.slice(1, PHONE_DIGITS_LIMIT + 1);
  }

  return digitsOnly.slice(0, PHONE_DIGITS_LIMIT);
}

function formatPhoneValue(value: string) {
  const digits = extractPhoneDigits(value);
  const areaCode = digits.slice(0, 3).padEnd(3, "_");
  const firstPart = digits.slice(3, 6).padEnd(3, "_");
  const secondPart = digits.slice(6, 8).padEnd(2, "_");
  const thirdPart = digits.slice(8, 10).padEnd(2, "_");

  return `+7 (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
}

function getPhoneCaretPosition(value: string) {
  const nextPlaceholderIndex = value.indexOf("_");
  return nextPlaceholderIndex === -1 ? value.length : nextPlaceholderIndex;
}

export function LeadForm({ defaultService = "" }: { defaultService?: string }) {
  const [serverMessage, setServerMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { ...defaultValues, service: defaultService },
  });

  // Слушаем выбор услуги из секции услуг
  useEffect(() => {
    const handleSelectedService = (event: Event) => {
      const customEvent = event as CustomEvent<{ serviceName?: string }>;
      const serviceName = customEvent.detail?.serviceName;
      if (serviceName) {
        setValue("service", serviceName, { shouldDirty: true, shouldTouch: true });
      }
    };

    window.addEventListener("lead-service:selected", handleSelectedService as EventListener);
    return () => {
      window.removeEventListener("lead-service:selected", handleSelectedService as EventListener);
    };
  }, [setValue]);

  const movePhoneCaret = () => {
    const input = phoneInputRef.current;
    if (!input) return;
    const caretPosition = getPhoneCaretPosition(input.value);
    input.setSelectionRange(caretPosition, caretPosition);
  };

  const onSubmit = handleSubmit((values, event) => {
    setServerMessage(null);

    const honeypot =
      event?.target instanceof HTMLFormElement ? new FormData(event.target).get("website") : null;

    if (honeypot) {
      reset({ ...defaultValues, service: defaultService });
      setServerMessage({
        type: "success",
        text: "Заявка отправлена. Мы свяжемся с вами в ближайшее время.",
      });
      return;
    }

    startTransition(async () => {
      const result = await submitLeadAction(values);

      if (result.success) {
        reset({ ...defaultValues, service: defaultService });
        setServerMessage({ type: "success", text: result.message });
        trackCtaEvent("lead_submit_success", { source: "landing_form" });
        return;
      }

      setServerMessage({ type: "error", text: result.message });
    });
  });

  return (
    <form id="lead-form" className="grid gap-3 sm:gap-4" onSubmit={onSubmit}>
      <label className="grid gap-2 text-sm text-slate-300">
        Ваше имя
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              autoComplete="given-name"
              placeholder="Как вас зовут?"
              type="text"
            />
          )}
        />
        {errors.name ? (
          <span className="text-xs text-rose-300">{errors.name.message}</span>
        ) : null}
      </label>

      <label className="grid gap-2 text-sm text-slate-300">
        Ваш телефон *
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Input
              {...field}
              ref={(element) => {
                field.ref(element);
                phoneInputRef.current = element;
              }}
              autoComplete="tel"
              inputMode="numeric"
              type="tel"
              onChange={(event) => {
                field.onChange(formatPhoneValue(event.target.value));
                requestAnimationFrame(movePhoneCaret);
              }}
              onKeyDown={(event) => {
                if (event.key === "Backspace") {
                  event.preventDefault();
                  const digits = extractPhoneDigits(field.value);
                  if (digits.length > 0) {
                    field.onChange(formatPhoneValue(digits.slice(0, -1)));
                    requestAnimationFrame(movePhoneCaret);
                  }
                }
              }}
              onClick={() => requestAnimationFrame(movePhoneCaret)}
              onFocus={() => requestAnimationFrame(movePhoneCaret)}
            />
          )}
        />
        {errors.phone ? (
          <span className="text-xs text-rose-300">{errors.phone.message}</span>
        ) : null}
      </label>

      <div className="grid gap-2 text-sm text-slate-300">
        <span id="lead-service-label">Услуга</span>
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <Select
              id="lead-service"
              options={SERVICE_OPTIONS}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Выберите услугу"
              disabled={isPending}
            />
          )}
        />
      </div>

      <div className="grid gap-2 text-sm text-slate-300">
        <span id="lead-model-label">Модель Volvo</span>
        <Controller
          control={control}
          name="model"
          render={({ field }) => (
            <Select
              id="lead-model"
              options={VOLVO_MODEL_OPTIONS}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Например, XC60"
              disabled={isPending}
            />
          )}
        />
      </div>

      <label className="grid gap-2 text-sm text-slate-300">
        Что случилось
        <Controller
          control={control}
          name="comment"
          render={({ field }) => (
            <Textarea
              {...field}
              rows={3}
              maxLength={1000}
              placeholder="Например: стук в подвеске, горит ошибка на панели"
              className="min-h-20 sm:min-h-24"
            />
          )}
        />
        {errors.comment ? (
          <span className="text-xs text-rose-300">{errors.comment.message}</span>
        ) : null}
      </label>

      {/* Honeypot: скрыто от людей, боты обычно заполняют */}
      <div
        aria-hidden
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label>
          Сайт
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid gap-1.5">
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-300">
              <input
                type="checkbox"
                name={field.name}
                ref={field.ref}
                checked={field.value}
                onChange={(event) => field.onChange(event.target.checked)}
                onBlur={field.onBlur}
                aria-invalid={errors.consent ? true : undefined}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[var(--highlight)]"
              />
              <span>
                Я согласен(на) на обработку персональных данных в соответствии с{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--highlight)] underline underline-offset-2 hover:text-white"
                >
                  политикой конфиденциальности
                </a>
              </span>
            </label>
          )}
        />
        {errors.consent ? (
          <span role="alert" className="text-xs text-rose-300">
            {errors.consent.message}
          </span>
        ) : null}
      </div>

      {serverMessage ? (
        <div
          role={serverMessage.type === "success" ? "status" : "alert"}
          className={
            serverMessage.type === "success"
              ? "rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"
              : "rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100"
          }
        >
          {serverMessage.type === "success" ? (
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden />
              <div>
                <p className="font-semibold">{serverMessage.text}</p>
                <p className="mt-1 text-emerald-100/80">
                  Если вопрос срочный, позвоните:{" "}
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="whitespace-nowrap font-semibold underline underline-offset-2"
                  >
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
          ) : (
            serverMessage.text
          )}
        </div>
      ) : null}

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
        onClick={() => trackCtaEvent("lead_cta_click", { location: "cta_form_submit" })}
      >
        {isPending ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Отправляем заявку
          </>
        ) : (
          <>
            <Phone className="mr-2 h-4 w-4" />
            Перезвоните мне
          </>
        )}
      </Button>

      <p className="text-center text-xs text-slate-400">
        Перезвоним в рабочее время и согласуем удобное время
      </p>
    </form>
  );
}
