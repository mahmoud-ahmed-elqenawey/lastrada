import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/app/admin/AdminShell";
import { updateClientTestimonial } from "@/app/admin/actions";
import { DeleteClientTestimonialButton } from "@/app/admin/testimonials/DeleteClientTestimonialButton";
import { TestimonialForm } from "@/app/admin/testimonials/TestimonialForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseClientTestimonialRow } from "@/lib/supabase/types";

type EditTestimonialPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
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

  const { data: testimonial, error } = await supabase.from("client_testimonials").select("*").eq("id", id).maybeSingle();

  if (error || !testimonial) {
    return (
      <AdminShell
        eyebrow="إدارة آراء العملاء"
        title="رأي العميل غير موجود"
        subtitle={
          error
            ? "تعذر تحميل بيانات رأي العميل. راجع إعدادات قاعدة البيانات أو جرّب تحديث الصفحة."
            : "لم يتم العثور على هذا الرأي. ربما تم حذفه أو أن رابط التعديل غير صحيح."
        }
      >
        <div className="soft-panel mt-8 rounded-[8px] p-6">
          {error ? <p className="mb-5 text-sm leading-6 text-red-100/80">{error.message}</p> : null}
          <Link href="/admin/testimonials" className="cinema-button cinema-button-muted">
            <ArrowRight aria-hidden="true" />
            الرجوع لآراء العملاء
          </Link>
        </div>
      </AdminShell>
    );
  }

  const typedTestimonial = testimonial as SupabaseClientTestimonialRow;

  return (
    <AdminShell
      eyebrow="إدارة آراء العملاء"
      title="تعديل رأي عميل"
      subtitle="حدّث الفيديو، النص، حالة الظهور، والترتيب داخل سلايدر آراء العملاء."
      actions={<DeleteClientTestimonialButton testimonialId={typedTestimonial.id} testimonialTitle={typedTestimonial.author_ar} />}
    >
      <TestimonialForm action={updateClientTestimonial} mode="edit" testimonial={typedTestimonial} />
    </AdminShell>
  );
}
