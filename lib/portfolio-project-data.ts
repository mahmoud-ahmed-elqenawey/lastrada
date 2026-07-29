import "server-only";

import { getLaStradaContent } from "@/lib/la-strada-content";
import type { Accent, PortfolioMedia, PortfolioProject } from "@/lib/la-strada-i18n";
import type { Locale } from "@/lib/locales";
import { getCanonicalProjectSlug } from "@/lib/portfolio-projects";
import { normalizeServiceCategory } from "@/lib/service-taxonomy";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  SupabaseLocale,
  SupabaseProjectTranslationRow,
  SupabaseProjectWithRelations,
} from "@/lib/supabase/types";

function sortBySortOrder<T extends { sort_order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.sort_order - b.sort_order);
}

function getTranslation(project: SupabaseProjectWithRelations, locale: Locale) {
  const preferredLocale = locale as SupabaseLocale;
  return (
    project.project_translations.find((translation) => translation.locale === preferredLocale) ??
    project.project_translations.find((translation) => translation.locale === "en") ??
    project.project_translations[0]
  );
}

function hasCaseStudy(translation: SupabaseProjectTranslationRow) {
  return Boolean(
    translation.overview_title ||
      translation.challenge_title ||
      translation.challenge ||
      translation.solution_title ||
      translation.solution ||
      translation.success_title ||
      translation.success_story ||
      translation.cta_title ||
      translation.cta_body,
  );
}

function mapMedia(project: SupabaseProjectWithRelations, locale: Locale): PortfolioMedia[] {
  return sortBySortOrder(project.project_media).map((item) => ({
    type: item.type,
    src: item.src,
    poster: item.poster ?? undefined,
    alt: locale === "ar" ? item.alt_ar || item.alt_en : item.alt_en || item.alt_ar,
    label: locale === "ar" ? item.label_ar || item.label_en || undefined : item.label_en || item.label_ar || undefined,
  }));
}

function mapProject(project: SupabaseProjectWithRelations, locale: Locale): PortfolioProject | null {
  const translation = getTranslation(project, locale);

  if (!translation) {
    return null;
  }

  const media = mapMedia(project, locale);
  const coverIndex = sortBySortOrder(project.project_media).findIndex((item) => item.is_cover);
  const cover = coverIndex >= 0 ? media[coverIndex] : media[0];
  const deliverables = sortBySortOrder(project.project_deliverables)
    .filter((item) => item.locale === locale)
    .map((item) => item.label);

  return {
    slug: project.slug,
    title: translation.title,
    category: normalizeServiceCategory(project.category),
    client: translation.client,
    description: translation.description,
    summary: translation.summary ?? undefined,
    type: translation.type ?? project.type,
    accent: project.accent as Accent,
    cover,
    media,
    caseStudy: hasCaseStudy(translation)
      ? {
          overviewTitle: translation.overview_title ?? (locale === "ar" ? "نظرة عامة" : "Overview"),
          challengeTitle: translation.challenge_title ?? (locale === "ar" ? "التحدي" : "Challenge"),
          challenge: translation.challenge ?? translation.description,
          solutionTitle: translation.solution_title ?? (locale === "ar" ? "الحل" : "Solution"),
          solution: translation.solution ?? translation.description,
          successTitle: translation.success_title ?? undefined,
          successStory: translation.success_story ?? undefined,
          deliverablesTitle: translation.deliverables_title ?? (locale === "ar" ? "المخرجات" : "Deliverables"),
          deliverables,
          galleryTitle: translation.gallery_title ?? (locale === "ar" ? "معرض المشروع" : "Project gallery"),
          videoTitle: translation.video_title ?? (locale === "ar" ? "الفيديو" : "Video"),
          ctaTitle: translation.cta_title ?? (locale === "ar" ? "ابدأ مشروعك" : "Start your project"),
          ctaBody:
            translation.cta_body ??
            (locale === "ar"
              ? "خلينا نحول فكرتك إلى تجربة بصرية واضحة."
              : "Let us turn your idea into a clear visual experience."),
          ctaLabel: translation.cta_label ?? (locale === "ar" ? "تواصل معنا" : "Contact us"),
        }
      : undefined,
  };
}

async function fetchSupabaseProjects(locale: Locale) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*, project_translations(*), project_media(*), project_deliverables(*)")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("Failed to load Supabase projects", error);
    return null;
  }

  const projects = (data as SupabaseProjectWithRelations[])
    .map((project) => mapProject(project, locale))
    .filter((project): project is PortfolioProject => Boolean(project));

  return projects.length ? projects : null;
}

export async function getPortfolioProjects(locale: Locale) {
  return (await fetchSupabaseProjects(locale)) ?? getLaStradaContent(locale).portfolio.projects;
}

export async function getPortfolioProjectBySlug(locale: Locale, slug: string) {
  const canonicalSlug = getCanonicalProjectSlug(slug);
  const projects = await getPortfolioProjects(locale);
  return projects.find((project) => project.slug === canonicalSlug);
}
