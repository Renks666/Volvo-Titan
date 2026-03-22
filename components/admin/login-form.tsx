"use client";

import { useActionState } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";

import { signInAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState = {
  success: false,
  message: "",
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInAction, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <label className="grid gap-2 text-sm text-slate-300">
        Email
        <Input name="email" type="email" placeholder="admin@example.com" required />
      </label>
      <label className="grid gap-2 text-sm text-slate-300">
        Пароль
        <Input name="password" type="password" placeholder="••••••••" required />
      </label>
      {state.message ? (
        <div
          className={
            state.success
              ? "rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"
              : "rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100"
          }
        >
          {state.message}
        </div>
      ) : null}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Входим
          </>
        ) : (
          <>
            <LockKeyhole className="mr-2 h-4 w-4" />
            Войти в CRM
          </>
        )}
      </Button>
    </form>
  );
}
