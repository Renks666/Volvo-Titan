import type { Metadata } from "next";

import { DashboardShell } from "@/components/admin/dashboard-shell";
import { LeadsTable } from "@/components/admin/leads-table";
import { requireAdminSession } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { LeadRecord } from "@/lib/types";

export const metadata: Metadata = {
  title: "CRM Leads",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

interface LeadsPageProps {
  searchParams?: Promise<{
    q?: string;
    status?: string;
    service?: string;
  }>;
}

export default async function AdminLeadsPage({ searchParams }: LeadsPageProps) {
  await requireAdminSession();

  const params = (await searchParams) || {};
  const query = params.q?.trim() || "";
  const status = params.status?.trim() || "all";
  const service = params.service?.trim() || "all";

  const supabase = await createSupabaseServerClient();

  let leadQuery = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (status === "new" || status === "processed") {
    leadQuery = leadQuery.eq("status", status);
  }

  if (service !== "all") {
    leadQuery = leadQuery.eq("service", service);
  }

  if (query) {
    const escapedQuery = query.replace(/,/g, " ");
    leadQuery = leadQuery.or(
      `name.ilike.%${escapedQuery}%,phone.ilike.%${escapedQuery}%,model.ilike.%${escapedQuery}%,comment.ilike.%${escapedQuery}%`,
    );
  }

  const [{ data: leads, error }, totalCountResult, newCountResult, processedCountResult] =
    await Promise.all([
      leadQuery,
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "processed"),
    ]);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <DashboardShell
      counts={{
        total: totalCountResult.count ?? 0,
        new: newCountResult.count ?? 0,
        processed: processedCountResult.count ?? 0,
      }}
      filters={{ query, status, service }}
    >
      <LeadsTable leads={(leads || []) as LeadRecord[]} />
    </DashboardShell>
  );
}
