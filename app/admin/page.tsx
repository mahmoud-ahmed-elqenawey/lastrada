import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/app/admin/AdminShell";
import { DeleteProjectButton } from "@/app/admin/projects/DeleteProjectButton";
import { getServiceCategoryLabel } from "@/lib/service-taxonomy";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AdminProjectListItem = {
  id: string;
  slug: string;
  status: string;
  category: string;
  type: string;
  sort_order: number;
  project_translations?: Array<{
    locale: string;
    title: string;
    client: string;
  }>;
};

type AdminPageProps = {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    deleted?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { created, updated, deleted } = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen bg-[#050505] px-5 py-10 text-white">
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

  const { data: adminUser } = await supabase.from("admin_users").select("*").eq("user_id", user.id).maybeSingle();

  if (!adminUser) {
    return (
      <main className="min-h-screen bg-[#050505] px-5 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-black">صلاحية الإدارة غير مفعلة</h1>
          <p className="mt-4 max-w-2xl text-white/62">
            حسابك مسجل، لكنه لا يملك صلاحية الدخول للوحة التحكم. تواصل مع المسؤول لإضافة صلاحية الإدارة.
          </p>
        </div>
      </main>
    );
  }

  const { data: projectsData } = await supabase
    .from("projects")
    .select("id, slug, status, category, type, sort_order, project_translations(locale, title, client)")
    .order("sort_order", { ascending: true });
  const projects = (projectsData ?? []) as AdminProjectListItem[];
  const publishedCount = projects.filter((project) => project.status === "published").length;
  const draftCount = projects.filter((project) => project.status === "draft").length;
  const latestProject = projects[projects.length - 1];

  return (
    <AdminShell
      title="المشاريع"
      subtitle="أنشئ وعدّل وانشر ورتّب المشاريع، وارفع الصور والفيديوهات، وأدر محتوى دراسات الحالة بالعربي والإنجليزي."
      actions={
        <Link href="/admin/projects/new" className="cinema-button cinema-button-primary">
          <Plus aria-hidden="true" />
          مشروع جديد
        </Link>
      }
    >
        {created || updated || deleted ? (
          <div className="mt-6 rounded-[8px] border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-100">
            {created ? "تم إنشاء المشروع." : updated ? "تم تحديث المشروع." : "تم حذف المشروع."}
          </div>
        ) : null}

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["إجمالي المشاريع", projects.length],
            ["منشورة", publishedCount],
            ["مسودات", draftCount],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-white/38">{label}</p>
              <p className="mt-3 text-3xl font-black text-white">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 overflow-hidden rounded-[8px] border border-white/10 bg-black/25">
          <div className="hidden grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-white/10 bg-white/[0.035] px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white/42 lg:grid">
            <span>المشروع</span>
            <span>الحالة</span>
            <span>الترتيب</span>
            <span>تعديل</span>
            <span>حذف</span>
          </div>
          {(projects ?? []).map((project) => {
            const translations = project.project_translations ?? [];
            const title = translations.find((item) => item.locale === "en")?.title ?? project.slug;
            const client = translations.find((item) => item.locale === "en")?.client ?? "";
            const categoryLabel = getServiceCategoryLabel(project.category, "ar");

            return (
              <article
                key={project.id}
                className="grid gap-4 border-b border-white/10 px-5 py-5 last:border-b-0 lg:grid-cols-[1fr_auto_auto_auto_auto] lg:py-4"
              >
                <div>
                  <h2 className="font-black text-white">{title}</h2>
                  <p className="mt-1 text-sm text-white/46">
                    {client} · {categoryLabel} · رابط الصفحة: {project.slug}
                  </p>
                </div>
                <span
                  className={`w-fit self-center rounded-full border px-3 py-1 text-xs font-black uppercase ${
                    project.status === "published"
                      ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-100/76"
                      : "border-amber-300/20 bg-amber-400/10 text-amber-100/76"
                  }`}
                >
                  {project.status === "published" ? "منشور" : "مسودة"}
                </span>
                <span className="self-center font-mono text-sm text-white/46">#{project.sort_order}</span>
                <div className="flex flex-wrap gap-2 lg:contents">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="cinema-button cinema-button-muted admin-compact-button self-center"
                  >
                    <Pencil aria-hidden="true" />
                    تعديل
                  </Link>
                  <div className="self-center">
                    <DeleteProjectButton projectId={project.id} projectTitle={title} />
                  </div>
                </div>
              </article>
            );
          })}
          {projects?.length ? null : (
            <div className="px-5 py-16 text-center">
              <p className="text-2xl font-black text-white">لا توجد مشاريع بعد</p>
              <p className="mt-3 text-white/48">أنشئ أول دراسة حالة في البورتفوليو من لوحة التحكم.</p>
              <Link href="/admin/projects/new" className="cinema-button cinema-button-primary mt-6">
                <Plus aria-hidden="true" />
                مشروع جديد
              </Link>
            </div>
          )}
        </section>
        {latestProject ? (
          <p className="mt-4 text-xs text-white/34">آخر مشروع في الترتيب: {latestProject.slug}</p>
        ) : null}
    </AdminShell>
  );
}
