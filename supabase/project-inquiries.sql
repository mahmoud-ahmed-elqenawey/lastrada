-- LA STRADA project inquiries.
-- Run this file in Supabase SQL Editor if the main schema was already created.

create table if not exists public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'new' check (status in ('new', 'contacted', 'done', 'archived')),
  name text not null,
  email text not null,
  company text not null default '',
  service text not null,
  budget text not null default '',
  message text not null,
  source_locale text not null default 'en' check (source_locale in ('ar', 'en')),
  page_path text not null default '',
  user_agent text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists project_inquiries_set_updated_at on public.project_inquiries;
create trigger project_inquiries_set_updated_at
before update on public.project_inquiries
for each row execute function public.set_updated_at();

alter table public.project_inquiries enable row level security;

drop policy if exists "Anyone can submit project inquiries" on public.project_inquiries;
create policy "Anyone can submit project inquiries"
on public.project_inquiries for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read project inquiries" on public.project_inquiries;
create policy "Admins can read project inquiries"
on public.project_inquiries for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update project inquiries" on public.project_inquiries;
create policy "Admins can update project inquiries"
on public.project_inquiries for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete project inquiries" on public.project_inquiries;
create policy "Admins can delete project inquiries"
on public.project_inquiries for delete
to authenticated
using (public.is_admin());

create index if not exists project_inquiries_status_created_idx on public.project_inquiries(status, created_at desc);
create index if not exists project_inquiries_created_idx on public.project_inquiries(created_at desc);

grant insert on table public.project_inquiries to anon, authenticated;
grant select, update, delete on table public.project_inquiries to authenticated;
grant select, insert, update, delete on table public.project_inquiries to service_role;
