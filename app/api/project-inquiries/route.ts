import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseLocale } from "@/lib/supabase/types";

const maxLengths = {
  name: 120,
  email: 180,
  company: 160,
  service: 160,
  budget: 80,
  message: 3000,
  pagePath: 240,
  userAgent: 320,
};

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanMultiline(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getLocale(value: unknown): SupabaseLocale {
  return value === "ar" ? "ar" : "en";
}

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ error: "Project inquiries are not configured." }, { status: 503 });
  }

  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = {
    name: cleanText(body.name, maxLengths.name),
    email: cleanText(body.email, maxLengths.email).toLowerCase(),
    company: cleanText(body.company, maxLengths.company),
    service: cleanText(body.service, maxLengths.service),
    budget: cleanText(body.budget, maxLengths.budget),
    message: cleanMultiline(body.message, maxLengths.message),
    source_locale: getLocale(body.sourceLocale),
    page_path: cleanText(body.pagePath, maxLengths.pagePath),
    user_agent: cleanText(request.headers.get("user-agent"), maxLengths.userAgent),
  };

  if (!payload.name || !payload.email || !payload.service || !payload.message) {
    return NextResponse.json({ error: "Name, email, service, and message are required." }, { status: 400 });
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const { error } = await supabase.from("project_inquiries").insert(payload);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
