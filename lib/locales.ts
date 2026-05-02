export const locales = ["ar", "en"] as const;
export const defaultLocale = "ar";

export type Locale = (typeof locales)[number];
export type Direction = "ltr" | "rtl";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

export function getLocalePath(locale: Locale) {
  return `/${locale}`;
}
