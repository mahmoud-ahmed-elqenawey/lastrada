import { ImageResponse } from "next/og";
import { getDirection, type Locale } from "@/lib/locales";
import { getLocalizedSeo } from "@/lib/seo";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

const accents = ["#2f4197", "#30a9dc", "#39b54a", "#f9a72b", "#ef4639", "#7158a6"];

export function createSocialImage(locale: Locale) {
  const seo = getLocalizedSeo(locale);
  const direction = getDirection(locale);
  const isArabic = locale === "ar";

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
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 22%, rgba(48,169,220,0.34), transparent 32%), radial-gradient(circle at 78% 70%, rgba(239,70,57,0.28), transparent 34%), linear-gradient(135deg, #050505 0%, #0b1114 46%, #050505 100%)",
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
                  fontSize: isArabic ? 94 : 118,
                  fontWeight: 900,
                  letterSpacing: 0,
                  lineHeight: 0.95,
                }}
              >
                {seo.imageTitle}
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
                {seo.imageSubtitle}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 128,
                height: 128,
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              LS
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
              {seo.imageDescription}
            </div>
            <div
              style={{
                display: "flex",
                color: "rgba(248,248,244,0.58)",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              lastrada.agency/{locale}
            </div>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
