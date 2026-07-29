import { AdminShell } from "@/app/admin/AdminShell";
import { createClientTestimonial } from "@/app/admin/actions";
import { TestimonialForm } from "@/app/admin/testimonials/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <AdminShell
      eyebrow="إدارة آراء العملاء"
      title="إضافة رأي عميل"
      subtitle="أضف فيديو العميل والنص المكتوب بالعربي والإنجليزي ليظهر داخل سلايدر آراء العملاء."
    >
      <TestimonialForm action={createClientTestimonial} mode="create" />
    </AdminShell>
  );
}
