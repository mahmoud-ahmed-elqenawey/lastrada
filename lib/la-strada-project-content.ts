import arOligaRose from "@/messages/projects/oliga-rose/ar.json";
import enOligaRose from "@/messages/projects/oliga-rose/en.json";
import arElmo3afah from "@/messages/projects/elmo3afah/ar.json";
import enElmo3afah from "@/messages/projects/elmo3afah/en.json";
import arAlGhanemHousing from "@/messages/projects/al-ghanem-housing/ar.json";
import enAlGhanemHousing from "@/messages/projects/al-ghanem-housing/en.json";
import arMegaCafeJordan from "@/messages/projects/mega-cafe-jordan/ar.json";
import enMegaCafeJordan from "@/messages/projects/mega-cafe-jordan/en.json";
import arAbuAlRabSocial from "@/messages/projects/abu-al-rab-social/ar.json";
import enAbuAlRabSocial from "@/messages/projects/abu-al-rab-social/en.json";
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
    { project: arAlGhanemHousing as PortfolioProject },
    { project: arElmo3afah as PortfolioProject, replacesSlug: "al-moafah-medical-center" },
    { project: arAbuAlRabSocial as PortfolioProject },
    { project: arMegaCafeJordan as PortfolioProject },
  ],
  en: [
    { project: enOligaRose as PortfolioProject },
    { project: enAlGhanemHousing as PortfolioProject },
    { project: enElmo3afah as PortfolioProject, replacesSlug: "al-moafah-medical-center" },
    { project: enAbuAlRabSocial as PortfolioProject },
    { project: enMegaCafeJordan as PortfolioProject },
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
