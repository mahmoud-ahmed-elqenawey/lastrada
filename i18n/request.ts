import { hasLocale } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getLaStradaMessages } from "@/lib/la-strada-messages";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: getLaStradaMessages(locale) as unknown as AbstractIntlMessages,
  };
});
