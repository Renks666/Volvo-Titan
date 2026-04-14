"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Phone } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { submitLeadAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export function LeadForm() {
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
    defaultValues,
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
    <form id="lead-form" className="grid gap-3 sm:gap-4" onSubmit={onSubmit}>
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

      <p className="text-center text-xs text-slate-500">
        Перезвоним в течение 15 минут в рабочее время
      </p>
    </form>
  );
}
