import Link from "next/link";
import { Plus, Save, X } from "lucide-react";
import { MediaUploadField } from "@/app/admin/projects/MediaUploadField";
import type { SupabaseAccent, SupabaseFeaturedBrandRow } from "@/lib/supabase/types";

const accents: Array<{ value: SupabaseAccent; label: string }> = [
  { value: "cyan", label: "سماوي" },
  { value: "blue", label: "أزرق" },
  { value: "green", label: "أخضر" },
  { value: "yellow", label: "أصفر" },
  { value: "red", label: "أحمر" },
  { value: "purple", label: "بنفسجي" },
];

type BrandFormProps = {
  action: (formData: FormData) => Promise<void>;
  mode: "create" | "edit";
  brand?: SupabaseFeaturedBrandRow;
};

export function BrandForm({ action, mode, brand }: BrandFormProps) {
  return (
    <form action={action} className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
      {brand ? <input type="hidden" name="brand_id" value={brand.id} /> : null}

      <section className="soft-panel grid gap-5 rounded-[8px] p-5 sm:p-6">
        <div>
          <p className="text-xs font-black text-[var(--brand-cyan)]">بيانات البراند</p>
          <h2 className="mt-2 text-2xl font-black">{mode === "edit" ? "تعديل شعار البراند" : "إضافة شعار جديد"}</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-white/74">
            <span>
              اسم البراند <span className="text-red-300">*</span>
            </span>
            <input name="name" required defaultValue={brand?.name ?? ""} className="admin-input" />
            <span className="admin-help text-xs font-normal leading-5 text-white/38" aria-hidden="true" />
          </label>

          <label className="grid gap-2 text-sm font-bold text-white/74">
            التصنيف
            <input name="category" placeholder="مثلا: مطاعم، طبي، عقارات" defaultValue={brand?.category ?? ""} className="admin-input" />
            <span className="admin-help text-xs font-normal leading-5 text-white/38" aria-hidden="true" />
          </label>
        </div>

        <MediaUploadField
          label="لوجو البراند"
          name="logo"
          accept="image/svg+xml,image/png,image/webp,image/jpeg"
          required
          uploadFolder="brands"
          defaultValue={brand?.logo ?? ""}
          help="الأفضل SVG أو PNG بخلفية شفافة وبمقاس 512×256."
        />

        <div className="grid gap-5 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-white/74">
            حالة الظهور
            <select name="status" defaultValue={brand?.status ?? "published"} className="admin-input">
              <option value="published" className="bg-black">
                منشور
              </option>
              <option value="draft" className="bg-black">
                مسودة
              </option>
            </select>
            <span className="admin-help text-xs font-normal leading-5 text-white/38" aria-hidden="true" />
          </label>

          <label className="grid gap-2 text-sm font-bold text-white/74">
            لون التمييز
            <select name="accent" defaultValue={brand?.accent ?? "cyan"} className="admin-input">
              {accents.map((accent) => (
                <option key={accent.value} value={accent.value} className="bg-black">
                  {accent.label}
                </option>
              ))}
            </select>
            <span className="admin-help text-xs font-normal leading-5 text-white/38" aria-hidden="true" />
          </label>

          <label className="grid gap-2 text-sm font-bold text-white/74">
            ترتيب الظهور
            <input name="sort_order" type="number" min={0} defaultValue={String(brand?.sort_order ?? 0)} className="admin-input" />
            <span className="admin-help text-xs font-normal leading-5 text-white/38">الأرقام الأقل تظهر أولا.</span>
          </label>
        </div>

        <label className="grid gap-2 text-sm font-bold text-white/74">
          وصف داخلي اختياري
          <textarea name="summary" rows={4} defaultValue={brand?.summary ?? ""} className="admin-input resize-y py-3" />
        </label>
      </section>

      <aside className="rounded-[8px] border border-white/10 bg-black/35 p-5 xl:sticky xl:top-6">
        <div className="grid gap-3">
          <button type="submit" className="cinema-button cinema-button-primary min-h-12 justify-center">
            {mode === "edit" ? <Save aria-hidden="true" /> : <Plus aria-hidden="true" />}
            {mode === "edit" ? "حفظ التعديلات" : "إضافة البراند"}
          </button>
          <Link href="/admin/brands" className="cinema-button cinema-button-muted min-h-12 justify-center">
            <X aria-hidden="true" />
            إلغاء
          </Link>
        </div>
      </aside>
    </form>
  );
}
