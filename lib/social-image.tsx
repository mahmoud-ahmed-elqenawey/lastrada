import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDirection, type Locale } from "@/lib/locales";
import { absoluteUrl, getLocalizedSeo } from "@/lib/seo";

/* eslint-disable @next/next/no-img-element */

export const socialImageSize = {
  width: 1200,
  height: 630,
};

const accents = ["#2f4197", "#30a9dc", "#39b54a", "#f9a72b", "#ef4639", "#7158a6"];
const socialFontPromise = readFile(join(process.cwd(), "public/fonts/NotoKufiArabic-Bold.ttf"));

type SocialImageOptions = {
  title?: string;
  subtitle?: string;
  description?: string;
  footer?: string;
  imageSrc?: string;
  imageAlt?: string;
  label?: string;
};

function getDisplayText(locale: Locale, options?: SocialImageOptions) {
  const seo = getLocalizedSeo(locale);
  return {
    title: truncateText(options?.title ?? seo.imageTitle, locale === "ar" ? 58 : 54),
    subtitle: truncateText(options?.subtitle ?? seo.imageSubtitle, locale === "ar" ? 64 : 58),
    description: truncateText(options?.description ?? seo.imageDescription, locale === "ar" ? 130 : 145),
    footer: options?.footer ?? `lastrada.agency/${locale}`,
    alt: options?.imageAlt ?? seo.imageAlt,
    label: options?.label ?? (locale === "ar" ? "حلول تسويقية وإبداعية" : "Creative marketing systems"),
  };
}

function truncateText(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1).trim()}…` : value;
}

export async function createSocialImage(locale: Locale, options?: SocialImageOptions) {
  const display = getDisplayText(locale, options);
  const direction = getDirection(locale);
  const isArabic = locale === "ar";
  const imageSrc = options?.imageSrc;
  const socialFont = await socialFontPromise;

  return new ImageResponse(
    (
      <div
        lang={locale}
        dir={direction}
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#050505",
          color: "#f8f8f4",
          direction,
          fontFamily: "Noto Kufi Arabic",
        }}
      >
        {imageSrc ? (
          <img
            alt=""
            src={imageSrc}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.36,
              filter: "saturate(1.05) contrast(1.05)",
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 22%, rgba(48,169,220,0.34), transparent 32%), radial-gradient(circle at 78% 70%, rgba(239,70,57,0.28), transparent 34%), linear-gradient(135deg, rgba(5,5,5,0.96) 0%, rgba(8,12,14,0.86) 46%, rgba(5,5,5,0.98) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.78), rgba(0,0,0,0.32) 48%, rgba(0,0,0,0.74)), linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.78))",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 62,
            left: 62,
            right: 62,
            height: 2,
            display: "flex",
            flexDirection: isArabic ? "row-reverse" : "row",
          }}
        >
          {accents.map((accent) => (
            <div key={accent} style={{ flex: 1, background: accent }} />
          ))}
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "96px 72px 70px",
            textAlign: isArabic ? "right" : "left",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 48 }}>
            <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
              <div
                style={{
                  display: "flex",
                  alignSelf: isArabic ? "flex-end" : "flex-start",
                  marginBottom: 24,
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 999,
                  padding: "10px 18px",
                  background: "rgba(255,255,255,0.055)",
                  color: "rgba(248,248,244,0.78)",
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: isArabic ? 0 : 1.5,
                  textTransform: isArabic ? "none" : "uppercase",
                }}
              >
                {display.label}
              </div>
              <div
                style={{
                  fontSize: isArabic ? 76 : 92,
                  fontWeight: 900,
                  letterSpacing: 0,
                  lineHeight: 0.98,
                }}
              >
                {display.title}
              </div>
              <div
                style={{
                  marginTop: 20,
                  fontSize: isArabic ? 34 : 36,
                  fontWeight: 800,
                  color: "#30a9dc",
                  letterSpacing: isArabic ? 0 : 5,
                  textTransform: isArabic ? "none" : "uppercase",
                }}
              >
                {display.subtitle}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 128,
                height: 128,
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 32,
                background: "rgba(255,255,255,0.08)",
                padding: 18,
              }}
            >
              <img
                alt="LA STRADA"
                src={absoluteUrl("/brand/lastrada-logo-web.png")}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 }}>
            <div
              style={{
                maxWidth: 820,
                fontSize: isArabic ? 32 : 34,
                lineHeight: 1.3,
                color: "rgba(248,248,244,0.82)",
              }}
            >
              {display.description}
            </div>
            <div
              style={{
                display: "flex",
                color: "rgba(248,248,244,0.58)",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {display.footer}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...socialImageSize,
      fonts: [
        {
          name: "Noto Kufi Arabic",
          data: socialFont,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
