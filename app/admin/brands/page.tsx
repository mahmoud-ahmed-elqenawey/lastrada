import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Pencil, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/app/admin/AdminShell";
import { DeleteFeaturedBrandButton } from "@/app/admin/brands/DeleteFeaturedBrandButton";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseFeaturedBrandRow } from "@/lib/supabase/types";

type BrandsPageProps = {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    deleted?: string;
  }>;
};

export default async function AdminBrandsPage({ searchParams }: BrandsPageProps) {
  const { created, updated, deleted } = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen bg-[#050505] px-5 py-10 text-white" dir="rtl" lang="ar">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black">إعدادات الاتصال غير مكتملة</h1>
          <p className="mt-4 text-white/62">لوحة التحكم غير جاهزة حاليا. تواصل مع المطور لمراجعة إعدادات الاتصال.</p>
        </div>
      </main>
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  if (!user || !supabase) {
    redirect("/admin/login");
  }

  const { data: adminUser } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

  if (!adminUser) {
    redirect("/admin");
  }

  const { data, error } = await supabase.from("featured_brands").select("*").order("sort_order", { ascending: true });
  const brands = (data ?? []) as SupabaseFeaturedBrandRow[];

  return (
    <AdminShell
      title="البراندات"
      subtitle="أضف شعارات البراندات التي تظهر في قسم أبرز العلامات التجارية داخل الموقع."
      actions={
        <Link href="/admin/brands/new" className="cinema-button cinema-button-primary">
          <Plus aria-hidden="true" />
          براند جديد
        </Link>
      }
    >
      {created || updated || deleted ? (
        <div className="mt-6 rounded-[8px] border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-100">
          {created ? "تم إضافة البراند." : updated ? "تم تحديث البراند." : "تم حذف البراند."}
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-[8px] border border-red-400/25 bg-red-500/10 p-4 text-sm font-bold leading-6 text-red-100">
          تعذر تحميل البراندات. {error.message}
        </div>
      ) : null}

      <section className="mt-8 overflow-hidden rounded-[8px] border border-white/10 bg-black/25">
        <div className="hidden grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-white/10 bg-white/[0.035] px-5 py-4 text-xs font-black text-white/42 lg:grid">
          <span>البراند</span>
          <span>الحالة</span>
          <span>الترتيب</span>
          <span>تعديل</span>
          <span>حذف</span>
        </div>

        {brands.map((brand) => (
          <article
            key={brand.id}
            className="grid gap-4 border-b border-white/10 px-5 py-5 last:border-b-0 lg:grid-cols-[1fr_auto_auto_auto_auto] lg:items-center lg:py-4"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-28 place-items-center rounded-[8px] bg-white/[0.06] p-3 ring-1 ring-white/10">
                <Image src={brand.logo} alt={brand.name} width={160} height={80} unoptimized className="max-h-10 w-full object-contain" />
              </div>
              <div>
                <h2 className="font-black text-white">{brand.name}</h2>
                <p className="mt-1 text-sm text-white/46">{brand.category || "بدون تصنيف"}</p>
              </div>
            </div>
            <span
              className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${
                brand.status === "published"
                  ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-100/76"
                  : "border-amber-300/20 bg-amber-400/10 text-amber-100/76"
              }`}
            >
              {brand.status === "published" ? "منشور" : "مسودة"}
            </span>
            <span className="font-mono text-sm text-white/46">#{brand.sort_order}</span>
            <Link href={`/admin/brands/${brand.id}/edit`} className="cinema-button cinema-button-muted admin-compact-button">
              <Pencil aria-hidden="true" />
              تعديل
            </Link>
            <DeleteFeaturedBrandButton brandId={brand.id} brandName={brand.name} />
          </article>
        ))}

        {brands.length ? null : (
          <div className="px-5 py-16 text-center">
            <BadgeCheck aria-hidden="true" className="mx-auto text-[var(--brand-cyan)]" size={34} />
            <p className="mt-4 text-2xl font-black text-white">لا توجد براندات بعد</p>
            <p className="mt-3 text-white/48">أضف أول شعار براند من صفحة الإضافة.</p>
            <Link href="/admin/brands/new" className="cinema-button cinema-button-primary mt-6">
              <Plus aria-hidden="true" />
              براند جديد
            </Link>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
