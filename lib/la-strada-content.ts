import type { LaStradaContent } from "@/lib/la-strada-i18n";
import { defaultLocale, type Locale } from "@/lib/locales";
import { getLaStradaMessages } from "@/lib/la-strada-messages";

export type SeoService = {
  title: string;
  description: string;
};

export const localizedContent: Record<Locale, LaStradaContent> = {
  ar: getLaStradaMessages("ar").content,
  en: getLaStradaMessages("en").content,
};

export function getLaStradaContent(locale: Locale) {
  return localizedContent[locale] ?? localizedContent[defaultLocale];
}

export const brand = localizedContent.en.brand;
export const sourceSite = localizedContent.en.sourceSite;

export const services: SeoService[] = localizedContent.en.solutionPillars.map((service) => ({
  title: service.title,
  description: service.description,
}));
