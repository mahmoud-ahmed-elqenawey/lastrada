import Link from "next/link";
import { Plus, Save, X } from "lucide-react";
import { MediaUploadField } from "@/app/admin/projects/MediaUploadField";
import type { SupabaseAccent, SupabaseClientTestimonialRow } from "@/lib/supabase/types";

const accents: Array<{ value: SupabaseAccent; label: string }> = [
  { value: "cyan", label: "سماوي" },
  { value: "blue", label: "أزرق" },
  { value: "green", label: "أخضر" },
  { value: "yellow", label: "أصفر" },
  { value: "red", label: "أحمر" },
  { value: "purple", label: "بنفسجي" },
];

type TestimonialFormProps = {
  action: (formData: FormData) => Promise<void>;
  mode: "create" | "edit";
  testimonial?: SupabaseClientTestimonialRow;
};

function Field({
  label,
  name,
  defaultValue,
  dir,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  dir?: "rtl" | "ltr";
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/74">
      <span>
        {label} {required ? <span className="text-red-300">*</span> : null}
      </span>
      <input name={name} dir={dir} required={required} defaultValue={defaultValue ?? ""} className="admin-input" />
      <span className="admin-help text-xs font-normal leading-5 text-white/38" aria-hidden="true" />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  dir,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  dir?: "rtl" | "ltr";
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/74">
      <span>
        {label} {required ? <span className="text-red-300">*</span> : null}
      </span>
      <textarea name={name} dir={dir} required={required} rows={5} defaultValue={defaultValue ?? ""} className="admin-input resize-y py-3" />
    </label>
  );
}

export function TestimonialForm({ action, mode, testimonial }: TestimonialFormProps) {
  return (
    <form action={action} className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
      {testimonial ? <input type="hidden" name="testimonial_id" value={testimonial.id} /> : null}

      <section className="soft-panel grid gap-6 rounded-[8px] p-5 sm:p-6">
        <div>
          <p className="text-xs font-black text-[var(--brand-cyan)]">بيانات رأي العميل</p>
          <h2 className="mt-2 text-2xl font-black">{mode === "edit" ? "تعديل رأي عميل" : "إضافة رأي عميل"}</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="اسم العميل بالعربي" name="author_ar" required dir="rtl" defaultValue={testimonial?.author_ar} />
          <Field label="اسم العميل بالإنجليزي" name="author_en" required dir="ltr" defaultValue={testimonial?.author_en} />
          <Field label="اسم الشركة بالعربي" name="company_ar" required dir="rtl" defaultValue={testimonial?.company_ar} />
          <Field label="اسم الشركة بالإنجليزي" name="company_en" required dir="ltr" defaultValue={testimonial?.company_en} />
          <Field label="وصف الخدمة بالعربي" name="role_ar" required dir="rtl" defaultValue={testimonial?.role_ar} />
          <Field label="وصف الخدمة بالإنجليزي" name="role_en" required dir="ltr" defaultValue={testimonial?.role_en} />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <TextAreaField label="نص الرأي بالعربي" name="content_ar" required dir="rtl" defaultValue={testimonial?.content_ar} />
          <TextAreaField label="نص الرأي بالإنجليزي" name="content_en" required dir="ltr" defaultValue={testimonial?.content_en} />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <MediaUploadField
            label="فيديو الرأي"
            name="video_src"
            accept="video/mp4,video/webm,video/quicktime"
            required
            uploadFolder="testimonials"
            defaultValue={testimonial?.video_src ?? ""}
            help="ارفع فيديو العميل أو الصق رابط فيديو عام."
          />
          <MediaUploadField
            label="صورة معاينة الفيديو"
            name="poster_src"
            accept="image/jpeg,image/png,image/webp"
            uploadFolder="testimonials"
            defaultValue={testimonial?.poster_src ?? ""}
            help="صورة تظهر قبل تشغيل الفيديو. يفضل مقاس رأسي 1080×1920."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-4">
          <label className="grid gap-2 text-sm font-bold text-white/74">
            حالة الظهور
            <select name="status" defaultValue={testimonial?.status ?? "published"} className="admin-input">
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
            <select name="accent" defaultValue={testimonial?.accent ?? "cyan"} className="admin-input">
              {accents.map((accent) => (
                <option key={accent.value} value={accent.value} className="bg-black">
                  {accent.label}
                </option>
              ))}
            </select>
            <span className="admin-help text-xs font-normal leading-5 text-white/38" aria-hidden="true" />
          </label>

          <label className="grid gap-2 text-sm font-bold text-white/74">
            مدة الفيديو <span className="text-red-300">*</span>
            <input name="duration" required placeholder="0:40" defaultValue={testimonial?.duration ?? ""} className="admin-input" />
            <span className="admin-help text-xs font-normal leading-5 text-white/38">مثال: 0:45</span>
          </label>

          <label className="grid gap-2 text-sm font-bold text-white/74">
            ترتيب الظهور
            <input name="sort_order" type="number" min={0} defaultValue={String(testimonial?.sort_order ?? 0)} className="admin-input" />
            <span className="admin-help text-xs font-normal leading-5 text-white/38">الأرقام الأقل تظهر أولا.</span>
          </label>
        </div>
      </section>

      <aside className="rounded-[8px] border border-white/10 bg-black/35 p-5 xl:sticky xl:top-6">
        <div className="grid gap-3">
          <button type="submit" className="cinema-button cinema-button-primary min-h-12 justify-center">
            {mode === "edit" ? <Save aria-hidden="true" /> : <Plus aria-hidden="true" />}
            {mode === "edit" ? "حفظ التعديلات" : "إضافة الرأي"}
          </button>
          <Link href="/admin/testimonials" className="cinema-button cinema-button-muted min-h-12 justify-center">
            <X aria-hidden="true" />
            إلغاء
          </Link>
        </div>
      </aside>
    </form>
  );
}
