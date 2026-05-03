import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const isDevLightMode = process.env.NEXT_PUBLIC_LA_STRADA_DEV_LIGHT === "1";
const handleI18nRouting = isDevLightMode ? null : createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (isDevLightMode || !handleI18nRouting) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
