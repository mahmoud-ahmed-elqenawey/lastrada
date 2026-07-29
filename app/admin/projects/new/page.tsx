import { AdminShell } from "@/app/admin/AdminShell";
import { createProject } from "@/app/admin/actions";
import { ProjectForm } from "@/app/admin/projects/ProjectForm";

export default function NewProjectPage() {
  return (
    <AdminShell
      eyebrow="إدارة البورتفوليو"
      title="إنشاء مشروع"
      subtitle="أضف مشروع جديد بمحتوى عربي وإنجليزي، وارفع الصور والفيديوهات، وحدد هل يظهر كمسودة أو مشروع منشور."
    >
      <ProjectForm action={createProject} mode="create" />
    </AdminShell>
  );
}
