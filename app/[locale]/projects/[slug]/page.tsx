import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { getLaStradaContent } from "@/lib/la-strada-content";
import { defaultLocale, isLocale, type Locale } from "@/lib/locales";
import {
  getProjectBySlug,
  getProjectCover,
  getProjectStaticParams,
  getProjectSummary,
  getProjectTitle,
} from "@/lib/portfolio-projects";
import { absoluteUrl, getLanguageAlternates, siteUrl } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function getAbsoluteMediaUrl(src?: string) {
  if (!src) return undefined;
  return src.startsWith("http") ? src : absoluteUrl(src);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectStaticParams();
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const project = getProjectBySlug(locale, slug);

  if (!project) {
    return {};
  }

  const content = getLaStradaContent(locale);
  const path = `/${locale}/projects/${project.slug}`;
  const cover = getProjectCover(project);
  const coverImage = getAbsoluteMediaUrl(cover?.type === "video" ? cover.poster : cover?.src);
  const projectTitle = getProjectTitle(project);
  const title = `${projectTitle} | ${content.brand.name}`;
  const description = getProjectSummary(project);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ...getLanguageAlternates(),
        ar: absoluteUrl(`/ar/projects/${project.slug}`),
        en: absoluteUrl(`/en/projects/${project.slug}`),
        "x-default": absoluteUrl(`/${defaultLocale}/projects/${project.slug}`),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: content.brand.name,
      type: "article",
      locale: locale === "ar" ? "ar_JO" : "en_US",
      images: coverImage
        ? [
            {
              url: coverImage,
              width: 900,
              height: 1600,
              alt: cover?.alt ?? projectTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [{ url: coverImage, alt: cover?.alt ?? projectTitle }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  setRequestLocale(localeParam);

  const content = getLaStradaContent(localeParam);
  const project = getProjectBySlug(localeParam, slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy content={content} locale={localeParam} project={project} />;
}
