import Link from "next/link";
import { Plus, Save, X } from "lucide-react";
import { MediaUploadField } from "@/app/admin/projects/MediaUploadField";
import { normalizeServiceCategory, serviceCategoryDefinitions, ServiceCategory } from "@/lib/service-taxonomy";
import type {
  SupabaseAccent,
  SupabaseProjectDeliverableRow,
  SupabaseProjectMediaRow,
  SupabaseProjectRow,
  SupabaseProjectTranslationRow,
} from "@/lib/supabase/types";

const accents: SupabaseAccent[] = ["cyan", "blue", "green", "yellow", "red", "purple"];
const accentLabels: Record<SupabaseAccent, string> = {
  cyan: "سماوي",
  blue: "أزرق",
  green: "أخضر",
  yellow: "أصفر",
  red: "أحمر",
  purple: "بنفسجي",
};

export type AdminProjectFormValue = SupabaseProjectRow & {
  project_translations: SupabaseProjectTranslationRow[];
  project_deliverables: SupabaseProjectDeliverableRow[];
  project_media: SupabaseProjectMediaRow[];
};

type ProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  mode: "create" | "edit";
  project?: AdminProjectFormValue;
};

function getTranslation(project: AdminProjectFormValue | undefined, locale: "en" | "ar") {
  return project?.project_translations.find((translation) => translation.locale === locale);
}

function getDeliverables(project: AdminProjectFormValue | undefined, locale: "en" | "ar") {
  return project?.project_deliverables
    .filter((deliverable) => deliverable.locale === locale)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((deliverable) => deliverable.label)
    .join("\n");
}

function getCover(project: AdminProjectFormValue | undefined) {
  return project?.project_media.find((item) => item.is_cover) ?? project?.project_media[0];
}

function getGalleryUrls(project: AdminProjectFormValue | undefined) {
  const cover = getCover(project);
  return project?.project_media
    .filter((item) => item.id !== cover?.id)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => item.src)
    .join("\n");
}

export function ProjectForm({ action, mode, project }: ProjectFormProps) {
  const cover = getCover(project);

  return (
    <form action={action} className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
      {project ? <input type="hidden" name="project_id" value={project.id} /> : null}
      <div className="grid gap-6">
        <section className="soft-panel rounded-[8px] p-5 sm:p-6">
          <SectionHeading index="01" title="إعدادات المشروع" body="تتحكم في ظهور المشروع داخل القائمة، الفلاتر، وحالة النشر." />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field
              label="رابط صفحة المشروع"
              name="slug"
              required
              placeholder="oliga-rose"
              defaultValue={project?.slug}
              minLength={2}
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              title="استخدم حروف إنجليزية صغيرة وأرقام وشرطات فقط."
              help="يظهر في رابط صفحة المشروع. استخدم حروف إنجليزية صغيرة وأرقام وشرطات فقط."
            />
            <label className="grid gap-2 text-sm font-bold text-white/74">
              <LabelText label="نوع الخدمة" required />
              <select
                name="category"
                required
                defaultValue={project?.category ? normalizeServiceCategory(project.category) : ServiceCategory.GraphicDesign}
                className="admin-input"
              >
                {serviceCategoryDefinitions.map((category) => (
                  <option key={category.value} value={category.value} className="bg-black">
                    {category.labels.ar}
                  </option>
                ))}
              </select>
              <span className="admin-help text-xs font-normal leading-5 text-white/38">
                قيمة ثابتة من أنواع خدمات لاسترادا، وتستخدم في البورتفوليو والفلاتر.
              </span>
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/74">
              لون التمييز
              <select name="accent" defaultValue={project?.accent ?? "cyan"} className="admin-input">
                {accents.map((accent) => (
                  <option key={accent} value={accent} className="bg-black">
                    {accentLabels[accent]}
                  </option>
                ))}
              </select>
              <span className="admin-help text-xs font-normal leading-5 text-white/38" aria-hidden="true" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/74">
              حالة النشر
              <select name="status" defaultValue={project?.status ?? "draft"} className="admin-input">
                <option value="draft" className="bg-black">
                  مسودة
                </option>
                <option value="published" className="bg-black">
                  منشور
                </option>
              </select>
              <span className="admin-help text-xs font-normal leading-5 text-white/38" aria-hidden="true" />
            </label>
            <Field
              label="ترتيب الظهور"
              name="sort_order"
              type="number"
              defaultValue={String(project?.sort_order ?? 0)}
              min={0}
              help="الأرقام الأقل تظهر أولا."
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <LocalizedFields locale="en" title="محتوى النسخة الإنجليزية" project={project} />
          <LocalizedFields locale="ar" title="محتوى النسخة العربية" project={project} rtl />
        </section>

        <section className="soft-panel rounded-[8px] p-5 sm:p-6">
          <SectionHeading index="03" title="مكتبة الصور والفيديوهات" body="ارفع صور أو فيديوهات المشروع، أو الصق روابط ملفات جاهزة إذا كانت مرفوعة بالفعل." />
          <div className="mt-6 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-white/74">
                نوع ملف الغلاف
                <select name="cover_type" defaultValue={cover?.type ?? "image"} className="admin-input">
                  <option value="image" className="bg-black">
                    صورة
                  </option>
                  <option value="video" className="bg-black">
                    فيديو
                  </option>
                </select>
                <span className="admin-help text-xs font-normal leading-5 text-white/38" aria-hidden="true" />
              </label>
              <MediaUploadField label="صورة معاينة الغلاف" name="cover_poster" accept="image/*" defaultValue={cover?.poster ?? ""} />
            </div>
            <MediaUploadField label="ملف الغلاف الرئيسي" name="cover_src" defaultValue={cover?.src ?? ""} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="وصف الغلاف بالإنجليزي" name="cover_alt_en" defaultValue={cover?.alt_en ?? ""} />
              <Field label="وصف الغلاف بالعربي" name="cover_alt_ar" defaultValue={cover?.alt_ar ?? ""} dir="rtl" />
            </div>
            <MediaUploadField
              label="صور وفيديوهات المعرض"
              name="gallery_urls"
              kind="textarea"
              multiple
              defaultValue={getGalleryUrls(project)}
              help="ضع كل رابط في سطر منفصل، أو ارفع أكثر من ملف وسيتم إضافتهم تلقائيا."
            />
          </div>
        </section>
      </div>

      <aside className="rounded-[8px] border border-white/10 bg-black/35 p-5 xl:sticky xl:top-6">
        <div className="grid gap-3">
          <button type="submit" className="cinema-button cinema-button-primary min-h-12 justify-center">
            {mode === "edit" ? <Save aria-hidden="true" /> : <Plus aria-hidden="true" />}
            {mode === "edit" ? "حفظ التعديلات" : "إنشاء المشروع"}
          </button>
          <Link href="/admin" className="cinema-button cinema-button-muted min-h-12 justify-center">
            <X aria-hidden="true" />
            إلغاء
          </Link>
        </div>
      </aside>
    </form>
  );
}

function SectionHeading({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[4rem_1fr]">
      <span className="font-mono text-sm text-white/34">{index}</span>
      <div>
        <h2 className="text-2xl font-black text-white">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/48">{body}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  defaultValue,
  dir,
  minLength,
  pattern,
  title,
  min,
  help,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  dir?: "rtl" | "ltr";
  minLength?: number;
  pattern?: string;
  title?: string;
  min?: number;
  help?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/74">
      <LabelText label={label} required={required} />
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        dir={dir}
        minLength={minLength}
        pattern={pattern}
        title={title}
        min={min}
        className="admin-input"
      />
      <span className="admin-help text-xs font-normal leading-5 text-white/38" aria-hidden={help ? undefined : "true"}>
        {help}
      </span>
    </label>
  );
}

function Textarea({
  label,
  name,
  required = false,
  help,
  dir,
  defaultValue,
  minLength,
}: {
  label: string;
  name: string;
  required?: boolean;
  help?: string;
  dir?: "rtl" | "ltr";
  defaultValue?: string;
  minLength?: number;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/74">
      <LabelText label={label} required={required} />
      <textarea
        name={name}
        required={required}
        rows={5}
        dir={dir}
        defaultValue={defaultValue}
        minLength={minLength}
        className="admin-input resize-y py-3"
      />
      <span className="admin-help text-xs font-normal leading-5 text-white/38" aria-hidden={help ? undefined : "true"}>
        {help}
      </span>
    </label>
  );
}

function LabelText({ label, required }: { label: string; required: boolean }) {
  return (
    <span>
      {label} {required ? <span className="text-red-300">*</span> : null}
    </span>
  );
}

function LocalizedFields({
  locale,
  title,
  project,
  rtl = false,
}: {
  locale: "en" | "ar";
  title: string;
  project?: AdminProjectFormValue;
  rtl?: boolean;
}) {
  const suffix = `_${locale}`;
  const dir = rtl ? "rtl" : "ltr";
  const translation = getTranslation(project, locale);

  return (
    <section className="soft-panel grid gap-5 rounded-[8px] p-5 sm:p-6" dir={dir}>
      <div>
        <p className="font-mono text-sm text-white/34">02</p>
        <h2 className="mt-2 text-2xl font-black">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-white/44">
          {locale === "ar" ? "المحتوى الذي يظهر في نسخة الموقع العربية." : "المحتوى الذي يظهر في نسخة الموقع الإنجليزية."}
        </p>
      </div>
      <Field label="العنوان" name={`title${suffix}`} required dir={dir} defaultValue={translation?.title ?? ""} minLength={2} />
      <Field label="العميل" name={`client${suffix}`} required dir={dir} defaultValue={translation?.client ?? ""} minLength={2} />
      <Textarea label="ملخص قصير" name={`summary${suffix}`} dir={dir} defaultValue={translation?.summary ?? ""} />
      <Textarea
        label="الوصف"
        name={`description${suffix}`}
        required
        dir={dir}
        defaultValue={translation?.description ?? ""}
        minLength={20}
      />
      <Field
        label="عنوان النظرة العامة"
        name={`overview_title${suffix}`}
        dir={dir}
        defaultValue={translation?.overview_title ?? ""}
      />
      <Field
        label="عنوان التحدي"
        name={`challenge_title${suffix}`}
        dir={dir}
        defaultValue={translation?.challenge_title ?? ""}
      />
      <Textarea label="التحدي" name={`challenge${suffix}`} dir={dir} defaultValue={translation?.challenge ?? ""} />
      <Field
        label="عنوان الحل"
        name={`solution_title${suffix}`}
        dir={dir}
        defaultValue={translation?.solution_title ?? ""}
      />
      <Textarea label="الحل" name={`solution${suffix}`} dir={dir} defaultValue={translation?.solution ?? ""} />
      <Field
        label="عنوان قصة النجاح"
        name={`success_title${suffix}`}
        dir={dir}
        defaultValue={translation?.success_title ?? ""}
      />
      <Textarea
        label="قصة النجاح"
        name={`success_story${suffix}`}
        dir={dir}
        defaultValue={translation?.success_story ?? ""}
      />
      <Field
        label="عنوان المخرجات"
        name={`deliverables_title${suffix}`}
        dir={dir}
        defaultValue={translation?.deliverables_title ?? ""}
      />
      <Textarea
        label="المخرجات"
        name={`deliverables${suffix}`}
        help="عنصر واحد في كل سطر."
        dir={dir}
        defaultValue={getDeliverables(project, locale)}
      />
      <Field
        label="عنوان المعرض"
        name={`gallery_title${suffix}`}
        dir={dir}
        defaultValue={translation?.gallery_title ?? ""}
      />
      <Field label="عنوان الفيديو" name={`video_title${suffix}`} dir={dir} defaultValue={translation?.video_title ?? ""} />
      <Field label="عنوان الدعوة لاتخاذ إجراء" name={`cta_title${suffix}`} dir={dir} defaultValue={translation?.cta_title ?? ""} />
      <Textarea label="نص الدعوة لاتخاذ إجراء" name={`cta_body${suffix}`} dir={dir} defaultValue={translation?.cta_body ?? ""} />
      <Field label="نص الزر" name={`cta_label${suffix}`} dir={dir} defaultValue={translation?.cta_label ?? ""} />
    </section>
  );
}
