import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "CRM Login",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin/leads");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="glass-panel metal-border w-full max-w-md rounded-[2rem] p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Volvo Titan CRM</p>
        <h1 className="mt-4 font-heading text-3xl text-white">Вход в админку</h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          Используйте учетную запись администратора Supabase Auth. Публичная
          регистрация отключена.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
