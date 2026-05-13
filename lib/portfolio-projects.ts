import { getLaStradaContent } from "@/lib/la-strada-content";
import type { PortfolioMedia, PortfolioProject } from "@/lib/la-strada-i18n";
import { locales, type Locale } from "@/lib/locales";

export function getProjectPath(locale: Locale, project: Pick<PortfolioProject, "slug">) {
  return `/${locale}/projects/${project.slug}`;
}

export function getProjectCover(project: PortfolioProject): PortfolioMedia | undefined {
  return project.cover ?? project.media?.[0];
}

export function getProjectSummary(project: PortfolioProject) {
  return project.summary ?? project.description;
}

export function getProjectTitle(project: Pick<PortfolioProject, "title">) {
  return project.title.trim();
}

export function getProjectBySlug(locale: Locale, slug: string) {
  return getLaStradaContent(locale).portfolio.projects.find((project) => project.slug === slug);
}

export function getProjectStaticParams() {
  return locales.flatMap((locale) =>
    getLaStradaContent(locale).portfolio.projects.map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}
