import arOligaRose from "@/messages/projects/oliga-rose/ar.json";
import enOligaRose from "@/messages/projects/oliga-rose/en.json";
import arElmo3afah from "@/messages/projects/elmo3afah/ar.json";
import enElmo3afah from "@/messages/projects/elmo3afah/en.json";
import type { LaStradaContent, PortfolioMedia, PortfolioProject } from "@/lib/la-strada-i18n";
import type { Locale } from "@/lib/locales";
import { resolveMediaUrl } from "@/lib/media-url";

type ProjectOverride = {
  project: PortfolioProject;
  replacesSlug?: string;
};

const projectOverrides: Record<Locale, ProjectOverride[]> = {
  ar: [
    { project: arOligaRose as PortfolioProject },
    { project: arElmo3afah as PortfolioProject, replacesSlug: "al-moafah-medical-center" },
  ],
  en: [
    { project: enOligaRose as PortfolioProject },
    { project: enElmo3afah as PortfolioProject, replacesSlug: "al-moafah-medical-center" },
  ],
};

function resolvePortfolioMedia(media?: PortfolioMedia): PortfolioMedia | undefined {
  if (!media) return undefined;

  return {
    ...media,
    src: resolveMediaUrl(media.src) ?? media.src,
    poster: resolveMediaUrl(media.poster),
  };
}

function resolvePortfolioProjectMedia(project: PortfolioProject): PortfolioProject {
  return {
    ...project,
    cover: resolvePortfolioMedia(project.cover),
    media: project.media?.map((item) => resolvePortfolioMedia(item) ?? item),
  };
}

export function withProjectContent(content: LaStradaContent, locale: Locale): LaStradaContent {
  const overrides = new Map(
    projectOverrides[locale].map(({ project, replacesSlug }) => [
      replacesSlug ?? project.slug,
      resolvePortfolioProjectMedia(project),
    ]),
  );
  const existingOverrideTargets = new Set(content.portfolio.projects.map((project) => project.slug));
  const addedProjects = projectOverrides[locale]
    .filter(({ project, replacesSlug }) => !existingOverrideTargets.has(replacesSlug ?? project.slug))
    .map(({ project }) => resolvePortfolioProjectMedia(project));

  return {
    ...content,
    portfolio: {
      ...content.portfolio,
      projects: [
        ...content.portfolio.projects.map((project) => overrides.get(project.slug) ?? project),
        ...addedProjects,
      ],
    },
  };
}
