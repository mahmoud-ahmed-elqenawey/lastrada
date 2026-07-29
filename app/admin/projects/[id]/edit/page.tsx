import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/app/admin/AdminShell";
import { updateProject } from "@/app/admin/actions";
import { DeleteProjectButton } from "@/app/admin/projects/DeleteProjectButton";
import { ProjectForm, type AdminProjectFormValue } from "@/app/admin/projects/ProjectForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
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

  const { data: project, error } = await supabase
    .from("projects")
    .select("*, project_translations(*), project_deliverables(*), project_media(*)")
    .eq("id", id)
    .maybeSingle();

  if (error || !project) {
    notFound();
  }

  const typedProject = project as AdminProjectFormValue;
  const title =
    typedProject.project_translations.find((translation) => translation.locale === "ar")?.title ??
    typedProject.project_translations.find((translation) => translation.locale === "en")?.title ??
    typedProject.slug;

  return (
    <AdminShell
      eyebrow="إدارة البورتفوليو"
      title="تعديل مشروع"
      subtitle="حدّث المحتوى، حالة النشر، الترتيب، والصور والفيديوهات الخاصة بهذا المشروع."
      actions={<DeleteProjectButton projectId={typedProject.id} projectTitle={title} />}
    >
      <ProjectForm action={updateProject} mode="edit" project={typedProject} />
    </AdminShell>
  );
}
