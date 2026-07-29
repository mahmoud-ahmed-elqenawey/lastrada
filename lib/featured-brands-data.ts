import "server-only";

import type { FeaturedBrand } from "@/lib/la-strada-i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseFeaturedBrandRow } from "@/lib/supabase/types";

function mapFeaturedBrand(brand: SupabaseFeaturedBrandRow): FeaturedBrand {
  return {
    name: brand.name,
    category: brand.category,
    summary: brand.summary,
    accent: brand.accent,
    logo: brand.logo,
  };
}

export async function getFeaturedBrands() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("featured_brands")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("Failed to load featured brands", error);
    return [];
  }

  return (data as SupabaseFeaturedBrandRow[]).map(mapFeaturedBrand);
}
