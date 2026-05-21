import arMessages from "@/messages/ar.json";
import enMessages from "@/messages/en.json";
import type { LaStradaContent } from "@/lib/la-strada-i18n";
import { defaultLocale, type Locale } from "@/lib/locales";
import { withProjectContent } from "@/lib/la-strada-project-content";

export type LaStradaMessages = {
  content: LaStradaContent;
};

const baseMessages: Record<Locale, LaStradaMessages> = {
  ar: arMessages as LaStradaMessages,
  en: enMessages as LaStradaMessages,
};

export function getLaStradaMessages(locale: Locale): LaStradaMessages {
  const messages = baseMessages[locale] ?? baseMessages[defaultLocale];

  return {
    ...messages,
    content: withProjectContent(messages.content, locale),
  };
}
