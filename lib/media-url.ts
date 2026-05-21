export const defaultLaStradaMediaBaseUrl = "https://pub-9152d84694a54c949533f907a0433921.r2.dev";

function normalizeBaseUrl(value?: string) {
  return value?.trim().replace(/\/+$/, "") ?? "";
}

function isAbsoluteOrLocalUrl(value: string) {
  return /^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(value) || value.startsWith("/") || value.startsWith("data:");
}

export function getLaStradaMediaBaseUrl() {
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_LA_STRADA_MEDIA_BASE_URL) || defaultLaStradaMediaBaseUrl;
}

export function resolveMediaUrl(src?: string) {
  if (!src) return undefined;

  const cleanSrc = src.trim();

  if (!cleanSrc || isAbsoluteOrLocalUrl(cleanSrc)) {
    return cleanSrc;
  }

  return `${getLaStradaMediaBaseUrl()}/${cleanSrc.replace(/^\/+/, "")}`;
}
