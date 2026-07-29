import "server-only";

import type { Locale } from "@/lib/locales";
import type { Testimonial } from "@/lib/la-strada-i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseClientTestimonialRow } from "@/lib/supabase/types";

function mapTestimonial(testimonial: SupabaseClientTestimonialRow, locale: Locale): Testimonial {
  const isArabic = locale === "ar";

  return {
    content: isArabic ? testimonial.content_ar : testimonial.content_en,
    author: isArabic ? testimonial.author_ar : testimonial.author_en,
    role: isArabic ? testimonial.role_ar : testimonial.role_en,
    company: isArabic ? testimonial.company_ar : testimonial.company_en,
    accent: testimonial.accent,
    videoSrc: testimonial.video_src,
    posterSrc: testimonial.poster_src ?? undefined,
    duration: testimonial.duration,
  };
}

export async function getClientTestimonials(locale: Locale) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("client_testimonials")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("Failed to load client testimonials", error);
    return [];
  }

  return (data as SupabaseClientTestimonialRow[]).map((testimonial) => mapTestimonial(testimonial, locale));
}
