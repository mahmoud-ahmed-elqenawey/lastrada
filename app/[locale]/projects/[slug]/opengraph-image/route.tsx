import { getLaStradaContent } from "@/lib/la-strada-content";
import { defaultLocale, isLocale, type Locale } from "@/lib/locales";
import {
  getCanonicalProjectSlug,
  getProjectBySlug,
  getProjectCover,
  getProjectSummary,
  getProjectTitle,
} from "@/lib/portfolio-projects";
import { absoluteUrl } from "@/lib/seo";
import { createSocialImage } from "@/lib/social-image";

export const runtime = "nodejs";

type ProjectSocialImageRouteContext = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function getAbsoluteMediaUrl(src?: string) {
  if (!src) return undefined;
  return src.startsWith("http") ? src : absoluteUrl(src);
}

export async function GET(_request: Request, { params }: ProjectSocialImageRouteContext) {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const canonicalSlug = getCanonicalProjectSlug(slug);
  const project = getProjectBySlug(locale, canonicalSlug);

  if (!project) {
    return new Response("Not found", { status: 404 });
  }

  const content = getLaStradaContent(locale);
  const cover = getProjectCover(project);
  const coverImage = getAbsoluteMediaUrl(cover?.type === "video" ? cover.poster : cover?.src);

  return await createSocialImage(locale, {
    title: locale === "ar" ? project.client : getProjectTitle(project),
    subtitle: locale === "ar" ? project.type : `${project.type} / ${project.client}`,
    description: locale === "ar" ? project.client : getProjectSummary(project),
    footer: locale === "ar" ? `lastrada.agency/${locale}` : `lastrada.agency/${locale}/projects/${project.slug}`,
    imageSrc: locale === "ar" ? undefined : coverImage,
    imageAlt: cover?.alt ?? getProjectTitle(project),
    label: locale === "ar" ? "دراسة حالة" : `${content.brand.name} case study`,
  });
}
