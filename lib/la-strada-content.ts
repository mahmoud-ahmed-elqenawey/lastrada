import type { Accent } from "@/lib/la-strada-i18n";

export type SeoService = {
  title: string;
  description: string;
  accent: Accent;
};

export const brand = {
  name: "LA STRADA",
  logo: "/brand/lastrada-logo.png",
};

export const sourceSite = {
  url: "https://www.lastrada.agency/",
  email: "info@lastrada.agency",
  facebook: "https://www.facebook.com/lastrada.marketing",
  office: {
    country: "Jordan",
    address: "Irbid - Down Town - K . Talal .St",
  },
};

export const services: SeoService[] = [
  {
    title: "Brand Identity",
    description: "Strategic visual identities that elevate brand value and strengthen market position.",
    accent: "blue",
  },
  {
    title: "Social Media Marketing",
    description: "Smart campaigns, content planning, account management, and reporting that turn engagement into results.",
    accent: "green",
  },
  {
    title: "Video Production",
    description: "Cinematic video content that tells brand stories and supports measurable business goals.",
    accent: "red",
  },
  {
    title: "Photography",
    description: "Professional photography that captures brand essence and creates compelling visual narratives.",
    accent: "cyan",
  },
  {
    title: "Digital Strategy",
    description: "Digital strategies aligned with business goals, market insight, growth, and performance marketing.",
    accent: "purple",
  },
];
