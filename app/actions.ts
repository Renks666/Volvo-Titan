"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sendTelegramLeadNotification } from "@/lib/telegram";
import type { ActionResult, AuthActionState, LeadFormValues, LeadStatus } from "@/lib/types";
import { adminSignInSchema, leadFormSchema, leadStatusSchema, reviewFormSchema } from "@/lib/validators";

export async function submitLeadAction(values: LeadFormValues): Promise<ActionResult> {
  const parsedValues = leadFormSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      success: false,
      message: parsedValues.error.issues[0]?.message || "Проверьте форму и попробуйте снова.",
    };
  }

  try {
    const supabase = createSupabaseAdminClient();
    const createdAt = new Date().toISOString();
    const payload = {
      name: parsedValues.data.name || null,
      phone: parsedValues.data.phone,
      model: parsedValues.data.model || null,
      service: parsedValues.data.service || null,
      comment: parsedValues.data.comment || null,
      status: "new" as const,
      created_at: createdAt,
    };

    const { error } = await supabase.from("leads").insert(payload);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/leads");

    try {
      await sendTelegramLeadNotification({
        ...parsedValues.data,
        createdAt,
      });
    } catch (error) {
      console.error("sendTelegramLeadNotification", error);
    }

    return {
      success: true,
      message: "Заявка отправлена. Мы свяжемся с вами в ближайшее время.",
    };
  } catch (error) {
    console.error("submitLeadAction", error);

    return {
      success: false,
      message:
        "Не удалось отправить заявку. Позвоните нам напрямую или повторите попытку через пару минут.",
    };
  }
}

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsedValues = adminSignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedValues.success) {
    return {
      success: false,
      message: parsedValues.error.issues[0]?.message || "Проверьте данные для входа.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsedValues.data);

  if (error) {
    console.error("[signInAction] Supabase error:", error.message, error.status);
    return {
      success: false,
      message: "Не удалось войти. Проверьте email и пароль.",
    };
  }

  redirect("/admin/leads");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateLeadStatusAction(input: {
  id: string;
  status: LeadStatus;
}) {
  await requireAdminSession();

  const parsedStatus = leadStatusSchema.safeParse(input.status);

  if (!parsedStatus.success) {
    throw new Error("Invalid status");
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ status: parsedStatus.data })
    .eq("id", input.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/leads");
}

export async function updateLeadAction(input: {
  id: string;
  name: string;
  model: string;
  service: string;
  comment: string;
}) {
  await requireAdminSession();

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({
      name: input.name.trim() || null,
      model: input.model.trim() || null,
      service: input.service.trim() || null,
      comment: input.comment.trim() || null,
    })
    .eq("id", input.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(id: string) {
  await requireAdminSession();

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/leads");
}

export async function createReviewAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const parsed = reviewFormSchema.safeParse({
    author_name: formData.get("author_name"),
    vehicle_model: formData.get("vehicle_model") || undefined,
    rating: formData.get("rating"),
    review_text: formData.get("review_text"),
    review_date: formData.get("review_date"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Проверьте форму");
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("reviews").insert({
    author_name: parsed.data.author_name,
    vehicle_model: parsed.data.vehicle_model || null,
    rating: parsed.data.rating,
    review_text: parsed.data.review_text,
    review_date: parsed.data.review_date,
    is_visible: true,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function deleteReviewAction(id: string) {
  await requireAdminSession();

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function toggleReviewVisibilityAction(id: string, isVisible: boolean) {
  await requireAdminSession();

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("reviews")
    .update({ is_visible: isVisible })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/reviews");
  revalidatePath("/");
}
