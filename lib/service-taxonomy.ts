import type { Accent } from "@/lib/la-strada-i18n";
import type { Locale } from "@/lib/locales";

export enum ServiceCategory {
  MarketingStrategy = "marketing_strategy",
  GraphicDesign = "graphic_design",
  DigitalDevelopment = "digital_development",
  ContentProduction = "content_production",
  SocialMediaManagement = "social_media_management",
}

export const serviceCategories = [
  ServiceCategory.MarketingStrategy,
  ServiceCategory.GraphicDesign,
  ServiceCategory.DigitalDevelopment,
  ServiceCategory.ContentProduction,
  ServiceCategory.SocialMediaManagement,
] as const;

export type ServiceCategoryValue = (typeof serviceCategories)[number];

export type ServiceCategoryDefinition = {
  value: ServiceCategoryValue;
  accent: Accent;
  labels: Record<Locale, string>;
};

export const serviceCategoryDefinitions: ServiceCategoryDefinition[] = [
  {
    value: ServiceCategory.MarketingStrategy,
    accent: "purple",
    labels: {
      ar: "الاستراتيجيات التسويقية",
      en: "Marketing Strategies",
    },
  },
  {
    value: ServiceCategory.GraphicDesign,
    accent: "blue",
    labels: {
      ar: "التصميم الجرافيكي",
      en: "Graphic Design",
    },
  },
  {
    value: ServiceCategory.DigitalDevelopment,
    accent: "green",
    labels: {
      ar: "البرمجة وتطوير الحلول الرقمية",
      en: "Programming & Digital Solutions",
    },
  },
  {
    value: ServiceCategory.ContentProduction,
    accent: "red",
    labels: {
      ar: "صناعة المحتوى",
      en: "Content Production",
    },
  },
  {
    value: ServiceCategory.SocialMediaManagement,
    accent: "cyan",
    labels: {
      ar: "إدارة وسائل التواصل الاجتماعي",
      en: "Social Media Management",
    },
  },
];

export const serviceCategoryValues = new Set<string>(serviceCategories);

export function isServiceCategory(value: string): value is ServiceCategoryValue {
  return serviceCategoryValues.has(value);
}

export function getServiceCategoryDefinition(value: string) {
  return serviceCategoryDefinitions.find((category) => category.value === normalizeServiceCategory(value));
}

export function getServiceCategoryLabel(value: string, locale: Locale) {
  return getServiceCategoryDefinition(value)?.labels[locale] ?? value;
}

export function normalizeServiceCategory(value: string): ServiceCategoryValue {
  if (isServiceCategory(value)) return value;

  const legacyMap: Record<string, ServiceCategoryValue> = {
    all: ServiceCategory.MarketingStrategy,
    branding: ServiceCategory.GraphicDesign,
    motion: ServiceCategory.ContentProduction,
    video: ServiceCategory.ContentProduction,
    photography: ServiceCategory.ContentProduction,
    social: ServiceCategory.SocialMediaManagement,
    website: ServiceCategory.DigitalDevelopment,
  };

  return legacyMap[value] ?? ServiceCategory.MarketingStrategy;
}
