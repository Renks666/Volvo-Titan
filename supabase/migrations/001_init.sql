create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text not null,
  service text,
  comment text,
  status text not null default 'new' check (status in ('new', 'processed')),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "service_role_full_access" on public.leads
for all
to service_role
using (true)
with check (true);

create policy "authenticated_can_read_leads" on public.leads
for select
to authenticated
using (true);

create policy "authenticated_can_update_leads" on public.leads
for update
to authenticated
using (true)
with check (true);

create policy "authenticated_can_delete_leads" on public.leads
for delete
to authenticated
using (true);
