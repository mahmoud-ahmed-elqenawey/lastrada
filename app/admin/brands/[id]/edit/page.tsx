import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/app/admin/AdminShell";
import { updateFeaturedBrand } from "@/app/admin/actions";
import { BrandForm } from "@/app/admin/brands/BrandForm";
import { DeleteFeaturedBrandButton } from "@/app/admin/brands/DeleteFeaturedBrandButton";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseFeaturedBrandRow } from "@/lib/supabase/types";

type EditBrandPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBrandPage({ params }: EditBrandPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/admin/login?error=config");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: adminUser } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

  if (!adminUser) {
    redirect("/admin");
  }

  const { data: brand, error } = await supabase.from("featured_brands").select("*").eq("id", id).maybeSingle();

  if (error || !brand) {
    return (
      <AdminShell
        eyebrow="إدارة البراندات"
        title="البراند غير موجود"
        subtitle={
          error
            ? "تعذر تحميل بيانات البراند. راجع إعدادات قاعدة البيانات أو جرّب تحديث الصفحة."
            : "لم يتم العثور على هذا البراند. ربما تم حذفه أو أن رابط التعديل غير صحيح."
        }
      >
        <div className="soft-panel mt-8 rounded-[8px] p-6">
          {error ? <p className="mb-5 text-sm leading-6 text-red-100/80">{error.message}</p> : null}
          <Link href="/admin/brands" className="cinema-button cinema-button-muted">
            <ArrowRight aria-hidden="true" />
            الرجوع للبراندات
          </Link>
        </div>
      </AdminShell>
    );
  }

  const typedBrand = brand as SupabaseFeaturedBrandRow;

  return (
    <AdminShell
      eyebrow="إدارة البراندات"
      title="تعديل براند"
      subtitle="حدّث بيانات الشعار، حالة الظهور، والترتيب داخل السلايدر."
      actions={<DeleteFeaturedBrandButton brandId={typedBrand.id} brandName={typedBrand.name} />}
    >
      <BrandForm action={updateFeaturedBrand} mode="edit" brand={typedBrand} />
    </AdminShell>
  );
}
