-- Convert project category values to the fixed LA STRADA service enum.
-- Run once in Supabase SQL Editor before using the updated dashboard form.

begin;

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

alter table public.projects
  alter column category drop default;

update public.projects
set category = case category
  when 'branding' then 'graphic_design'
  when 'motion' then 'content_production'
  when 'video' then 'content_production'
  when 'photography' then 'content_production'
  when 'social' then 'social_media_management'
  when 'website' then 'digital_development'
  when 'all' then 'marketing_strategy'
  when '' then 'marketing_strategy'
  else category
end;

alter table public.projects
  alter column category type public.project_service_category
  using category::public.project_service_category;

alter table public.projects
  alter column category set default 'marketing_strategy'::public.project_service_category;

commit;
