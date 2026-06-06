import { isLocale } from "@/lib/locales";
import { createSocialImage } from "@/lib/social-image";

export const runtime = "nodejs";

type SocialImageRouteContext = {
  params: Promise<{
    locale: string;
  }>;
};

export async function GET(_request: Request, { params }: SocialImageRouteContext) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }

  return await createSocialImage(locale);
}
