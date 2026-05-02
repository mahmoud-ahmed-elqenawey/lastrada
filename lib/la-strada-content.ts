import arMessages from "@/messages/ar.json";
import enMessages from "@/messages/en.json";
import type { LaStradaContent } from "@/lib/la-strada-i18n";
import { defaultLocale, type Locale } from "@/lib/locales";

export type SeoService = {
  title: string;
  description: string;
};

export const localizedContent: Record<Locale, LaStradaContent> = {
  ar: arMessages.content as LaStradaContent,
  en: enMessages.content as LaStradaContent,
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
