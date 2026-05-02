import type { MetadataRoute } from "next";
import { getLanguageAlternates, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = getLanguageAlternates();

  return [
    {
      url: `${siteUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages,
      },
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages,
      },
    },
  ];
}
