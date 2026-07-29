import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { updateSupabaseSession } from "@/lib/supabase/proxy";

const isDevLightMode = process.env.NEXT_PUBLIC_LA_STRADA_DEV_LIGHT === "1";
const handleI18nRouting = isDevLightMode ? null : createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSupabaseSession(request);
  }

  if (isDevLightMode || !handleI18nRouting) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
