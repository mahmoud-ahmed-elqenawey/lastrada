-- LA STRADA portfolio dashboard schema.
-- Run this file in the Supabase SQL Editor.

create extension if not exists pgcrypto;

do $$
begin
  create type public.project_service_category as enum (
    'marketing_strategy',
    'graphic_design',
    'digital_development',
    'content_production',
    'social_media_management'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  category public.project_service_category not null default 'marketing_strategy',
  accent text not null default 'cyan' check (accent in ('blue', 'cyan', 'green', 'yellow', 'red', 'purple')),
  type text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_translations (
  project_id uuid not null references public.projects(id) on delete cascade,
  locale text not null check (locale in ('ar', 'en')),
  title text not null,
  client text not null,
  type text,
  description text not null,
  summary text,
  overview_title text,
  challenge_title text,
  challenge text,
  solution_title text,
  solution text,
  success_title text,
  success_story text,
  deliverables_title text,
  gallery_title text,
  video_title text,
  cta_title text,
  cta_body text,
  cta_label text,
  primary key (project_id, locale)
);

create table if not exists public.project_deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  locale text not null check (locale in ('ar', 'en')),
  label text not null,
  sort_order integer not null default 0
);

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  type text not null check (type in ('image', 'video')),
  src text not null,
  poster text,
  alt_ar text not null default '',
  alt_en text not null default '',
  label_ar text,
  label_en text,
  is_cover boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.featured_brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default '',
  summary text not null default '',
  logo text not null,
  accent text not null default 'cyan' check (accent in ('blue', 'cyan', 'green', 'yellow', 'red', 'purple')),
  status text not null default 'published' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists featured_brands_set_updated_at on public.featured_brands;
create trigger featured_brands_set_updated_at
before update on public.featured_brands
for each row execute function public.set_updated_at();

drop trigger if exists client_testimonials_set_updated_at on public.client_testimonials;
create trigger client_testimonials_set_updated_at
before update on public.client_testimonials
for each row execute function public.set_updated_at();

drop trigger if exists project_inquiries_set_updated_at on public.project_inquiries;
create trigger project_inquiries_set_updated_at
before update on public.project_inquiries
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;
alter table public.project_translations enable row level security;
alter table public.project_deliverables enable row level security;
alter table public.project_media enable row level security;
alter table public.featured_brands enable row level security;
alter table public.client_testimonials enable row level security;
alter table public.project_inquiries enable row level security;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users for select
to authenticated
using (public.is_admin());

drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public"
on public.projects for select
to anon, authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "Admins can mutate projects" on public.projects;
create policy "Admins can mutate projects"
on public.projects for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Published project translations are public" on public.project_translations;
create policy "Published project translations are public"
on public.project_translations for select
to anon, authenticated
using (
  exists (
    select 1 from public.projects
    where projects.id = project_translations.project_id
    and (projects.status = 'published' or public.is_admin())
  )
);

drop policy if exists "Admins can mutate project translations" on public.project_translations;
create policy "Admins can mutate project translations"
on public.project_translations for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Published project deliverables are public" on public.project_deliverables;
create policy "Published project deliverables are public"
on public.project_deliverables for select
to anon, authenticated
using (
  exists (
    select 1 from public.projects
    where projects.id = project_deliverables.project_id
    and (projects.status = 'published' or public.is_admin())
  )
);

drop policy if exists "Admins can mutate project deliverables" on public.project_deliverables;
create policy "Admins can mutate project deliverables"
on public.project_deliverables for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Published project media is public" on public.project_media;
create policy "Published project media is public"
on public.project_media for select
to anon, authenticated
using (
  exists (
    select 1 from public.projects
    where projects.id = project_media.project_id
    and (projects.status = 'published' or public.is_admin())
  )
);

drop policy if exists "Admins can mutate project media" on public.project_media;
create policy "Admins can mutate project media"
on public.project_media for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Published featured brands are public" on public.featured_brands;
create policy "Published featured brands are public"
on public.featured_brands for select
to anon, authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "Admins can mutate featured brands" on public.featured_brands;
create policy "Admins can mutate featured brands"
on public.featured_brands for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

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

create index if not exists projects_status_sort_idx on public.projects(status, sort_order);
create index if not exists project_media_project_sort_idx on public.project_media(project_id, sort_order);
create index if not exists project_deliverables_project_locale_sort_idx on public.project_deliverables(project_id, locale, sort_order);
create index if not exists featured_brands_status_sort_idx on public.featured_brands(status, sort_order);
create index if not exists client_testimonials_status_sort_idx on public.client_testimonials(status, sort_order);
create index if not exists project_inquiries_status_created_idx on public.project_inquiries(status, created_at desc);
create index if not exists project_inquiries_created_idx on public.project_inquiries(created_at desc);

grant insert on table public.project_inquiries to anon, authenticated;
grant select, update, delete on table public.project_inquiries to authenticated;
grant select, insert, update, delete on table public.project_inquiries to service_role;

alter table public.project_translations
add column if not exists type text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-media',
  'project-media',
  true,
  524288000,
  array[
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Project media files are public" on storage.objects;
create policy "Project media files are public"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'project-media');

drop policy if exists "Admins can upload project media files" on storage.objects;
create policy "Admins can upload project media files"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-media' and public.is_admin());

drop policy if exists "Admins can update project media files" on storage.objects;
create policy "Admins can update project media files"
on storage.objects for update
to authenticated
using (bucket_id = 'project-media' and public.is_admin())
with check (bucket_id = 'project-media' and public.is_admin());

drop policy if exists "Admins can delete project media files" on storage.objects;
create policy "Admins can delete project media files"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-media' and public.is_admin());
