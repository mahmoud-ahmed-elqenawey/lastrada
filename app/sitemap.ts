import type { MetadataRoute } from "next";
import { getLaStradaContent } from "@/lib/la-strada-content";
import { defaultLocale, locales } from "@/lib/locales";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const rootLanguages = {
    ar: `${siteUrl}/ar`,
    en: `${siteUrl}/en`,
    "x-default": `${siteUrl}/${defaultLocale}`,
  };

  const projectPages = locales.flatMap((locale) =>
    getLaStradaContent(locale).portfolio.projects.map((project) => ({
      url: `${siteUrl}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.72,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/projects/${project.slug}`,
          en: `${siteUrl}/en/projects/${project.slug}`,
          "x-default": `${siteUrl}/${defaultLocale}/projects/${project.slug}`,
        },
      },
    })),
  );

  return [
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: rootLanguages,
      },
    },
    {
      url: `${siteUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: rootLanguages,
      },
    },
    ...projectPages,
  ];
}
