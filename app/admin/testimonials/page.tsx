import Link from "next/link";
import { MessageSquareQuote, Pencil, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/app/admin/AdminShell";
import { DeleteClientTestimonialButton } from "@/app/admin/testimonials/DeleteClientTestimonialButton";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseClientTestimonialRow } from "@/lib/supabase/types";

type TestimonialsPageProps = {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    deleted?: string;
  }>;
};

export default async function AdminTestimonialsPage({ searchParams }: TestimonialsPageProps) {
  const { created, updated, deleted } = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen bg-[#050505] px-5 py-10 text-white" dir="rtl" lang="ar">
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

  const { data: adminUser } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

  if (!adminUser) {
    redirect("/admin");
  }

  const { data, error } = await supabase.from("client_testimonials").select("*").order("sort_order", { ascending: true });
  const testimonials = (data ?? []) as SupabaseClientTestimonialRow[];

  return (
    <AdminShell
      title="آراء العملاء"
      subtitle="أضف آراء العملاء بالفيديو والنص، وحدد ترتيب ظهورها داخل سلايدر آراء العملاء في الموقع."
      actions={
        <Link href="/admin/testimonials/new" className="cinema-button cinema-button-primary">
          <Plus aria-hidden="true" />
          رأي جديد
        </Link>
      }
    >
      {created || updated || deleted ? (
        <div className="mt-6 rounded-[8px] border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-100">
          {created ? "تم إضافة رأي العميل." : updated ? "تم تحديث رأي العميل." : "تم حذف رأي العميل."}
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-[8px] border border-red-400/25 bg-red-500/10 p-4 text-sm font-bold leading-6 text-red-100">
          تعذر تحميل آراء العملاء. {error.message}
        </div>
      ) : null}

      <section className="mt-8 overflow-hidden rounded-[8px] border border-white/10 bg-black/25">
        <div className="hidden grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-white/10 bg-white/[0.035] px-5 py-4 text-xs font-black text-white/42 lg:grid">
          <span>رأي العميل</span>
          <span>الحالة</span>
          <span>الترتيب</span>
          <span>تعديل</span>
          <span>حذف</span>
        </div>

        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="grid gap-4 border-b border-white/10 px-5 py-5 last:border-b-0 lg:grid-cols-[1fr_auto_auto_auto_auto] lg:items-center lg:py-4"
          >
            <div>
              <h2 className="font-black text-white">{testimonial.author_ar}</h2>
              <p className="mt-1 text-sm text-white/46">
                {testimonial.company_ar} · {testimonial.role_ar} · {testimonial.duration}
              </p>
            </div>
            <span
              className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${
                testimonial.status === "published"
                  ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-100/76"
                  : "border-amber-300/20 bg-amber-400/10 text-amber-100/76"
              }`}
            >
              {testimonial.status === "published" ? "منشور" : "مسودة"}
            </span>
            <span className="font-mono text-sm text-white/46">#{testimonial.sort_order}</span>
            <Link href={`/admin/testimonials/${testimonial.id}/edit`} className="cinema-button cinema-button-muted admin-compact-button">
              <Pencil aria-hidden="true" />
              تعديل
            </Link>
            <DeleteClientTestimonialButton testimonialId={testimonial.id} testimonialTitle={testimonial.author_ar} />
          </article>
        ))}

        {testimonials.length ? null : (
          <div className="px-5 py-16 text-center">
            <MessageSquareQuote aria-hidden="true" className="mx-auto text-[var(--brand-cyan)]" size={34} />
            <p className="mt-4 text-2xl font-black text-white">لا توجد آراء عملاء بعد</p>
            <p className="mt-3 text-white/48">أضف أول رأي عميل بالفيديو والنص من صفحة الإضافة.</p>
            <Link href="/admin/testimonials/new" className="cinema-button cinema-button-primary mt-6">
              <Plus aria-hidden="true" />
              رأي جديد
            </Link>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
