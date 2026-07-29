import { AdminShell } from "@/app/admin/AdminShell";
import { createFeaturedBrand } from "@/app/admin/actions";
import { BrandForm } from "@/app/admin/brands/BrandForm";

export default function NewBrandPage() {
  return (
    <AdminShell
      eyebrow="إدارة البراندات"
      title="إضافة براند"
      subtitle="أضف شعار براند جديد ليظهر في قسم أبرز العلامات التجارية داخل الموقع."
    >
      <BrandForm action={createFeaturedBrand} mode="create" />
    </AdminShell>
  );
}
