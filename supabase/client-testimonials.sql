-- Run this in Supabase SQL Editor if the client testimonials dashboard table is missing.

create table if not exists public.client_testimonials (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'draft' check (status in ('draft', 'published')),
  accent text not null default 'cyan' check (accent in ('blue', 'cyan', 'green', 'yellow', 'red', 'purple')),
  author_ar text not null,
  author_en text not null,
  role_ar text not null,
  role_en text not null,
  company_ar text not null,
  company_en text not null,
  content_ar text not null,
  content_en text not null,
  video_src text not null,
  poster_src text,
  duration text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists client_testimonials_set_updated_at on public.client_testimonials;
create trigger client_testimonials_set_updated_at
before update on public.client_testimonials
for each row execute function public.set_updated_at();

alter table public.client_testimonials enable row level security;

drop policy if exists "Published client testimonials are public" on public.client_testimonials;
create policy "Published client testimonials are public"
on public.client_testimonials for select
to anon, authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "Admins can mutate client testimonials" on public.client_testimonials;
create policy "Admins can mutate client testimonials"
on public.client_testimonials for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create index if not exists client_testimonials_status_sort_idx on public.client_testimonials(status, sort_order);
