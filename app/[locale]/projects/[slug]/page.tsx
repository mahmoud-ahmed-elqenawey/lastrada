import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { getLaStradaContent } from "@/lib/la-strada-content";
import { defaultLocale, isLocale, type Locale } from "@/lib/locales";
import { getPortfolioProjectBySlug } from "@/lib/portfolio-project-data";
import {
  getCanonicalProjectSlug,
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

export const dynamicParams = true;
export const revalidate = 60;

export function generateStaticParams() {
  return getProjectStaticParams();
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const canonicalSlug = getCanonicalProjectSlug(slug);
  const project = await getPortfolioProjectBySlug(locale, canonicalSlug);

  if (!project) {
    return {};
  }

  const content = getLaStradaContent(locale);
  const path = `/${locale}/projects/${project.slug}`;
  const cover = getProjectCover(project);
  const socialImage = absoluteUrl(`${path}/opengraph-image`);
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
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: cover?.alt ?? projectTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImage, alt: cover?.alt ?? projectTitle }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  setRequestLocale(localeParam);

  const canonicalSlug = getCanonicalProjectSlug(slug);

  if (canonicalSlug !== slug) {
    redirect(`/${localeParam}/projects/${canonicalSlug}`);
  }

  const content = getLaStradaContent(localeParam);
  const project = await getPortfolioProjectBySlug(localeParam, canonicalSlug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy content={content} locale={localeParam} project={project} />;
}
