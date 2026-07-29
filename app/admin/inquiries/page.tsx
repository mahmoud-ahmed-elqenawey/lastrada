import { Inbox, Mail, Save } from "lucide-react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/app/admin/AdminShell";
import { updateProjectInquiryStatus } from "@/app/admin/actions";
import { DeleteProjectInquiryButton } from "@/app/admin/inquiries/DeleteProjectInquiryButton";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseProjectInquiryRow, SupabaseProjectInquiryStatus } from "@/lib/supabase/types";

const statusOptions: Array<{ value: SupabaseProjectInquiryStatus; label: string; className: string }> = [
  {
    value: "new",
    label: "جديد",
    className: "border-cyan-300/20 bg-cyan-400/10 text-cyan-100/82",
  },
  {
    value: "contacted",
    label: "تم التواصل",
    className: "border-amber-300/20 bg-amber-400/10 text-amber-100/82",
  },
  {
    value: "done",
    label: "مكتمل",
    className: "border-emerald-300/20 bg-emerald-400/10 text-emerald-100/82",
  },
  {
    value: "archived",
    label: "مؤرشف",
    className: "border-white/10 bg-white/[0.035] text-white/54",
  },
];

type InquiriesPageProps = {
  searchParams: Promise<{
    updated?: string;
    deleted?: string;
  }>;
};

function getStatusOption(status: SupabaseProjectInquiryStatus) {
  return statusOptions.find((option) => option.value === status) ?? statusOptions[0];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ar-JO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminInquiriesPage({ searchParams }: InquiriesPageProps) {
  const { updated, deleted } = await searchParams;

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

  const { data, error } = await supabase.from("project_inquiries").select("*").order("created_at", { ascending: false });
  const inquiries = (data ?? []) as SupabaseProjectInquiryRow[];

  return (
    <AdminShell
      title="طلبات الموقع"
      subtitle="كل طلب يتم إرساله من فورم ابدأ مشروعك يظهر هنا مع بيانات العميل والخدمة المطلوبة وحالة المتابعة."
    >
      {updated || deleted ? (
        <div className="mt-6 rounded-[8px] border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-100">
          {updated ? "تم تحديث حالة الطلب." : "تم حذف الطلب."}
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-[8px] border border-red-400/25 bg-red-500/10 p-4 text-sm font-bold leading-6 text-red-100">
          تعذر تحميل طلبات الموقع. {error.message}
        </div>
      ) : null}

      <section className="mt-8 grid gap-4">
        {inquiries.map((inquiry) => {
          const status = getStatusOption(inquiry.status);

          return (
            <article key={inquiry.id} className="soft-panel rounded-[8px] p-5 sm:p-6">
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${status.className}`}>
                      {status.label}
                    </span>
                    <span className="font-mono text-xs text-white/38">{formatDate(inquiry.created_at)}</span>
                    <span className="font-mono text-xs text-white/34">{inquiry.source_locale.toUpperCase()}</span>
                  </div>

                  <h2 className="mt-5 text-2xl font-black text-white sm:text-3xl">{inquiry.name}</h2>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold text-white/54">
                    <a className="inline-flex items-center gap-2 text-[var(--brand-cyan)] hover:text-white" href={`mailto:${inquiry.email}`}>
                      <Mail aria-hidden="true" size={16} />
                      {inquiry.email}
                    </a>
                    {inquiry.company ? <span>{inquiry.company}</span> : null}
                  </div>

                  <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[8px] bg-white/[0.025] p-4">
                      <dt className="text-xs font-black uppercase tracking-[0.16em] text-white/34">الخدمة</dt>
                      <dd className="mt-2 text-base font-black text-white/82">{inquiry.service}</dd>
                    </div>
                    <div className="rounded-[8px] bg-white/[0.025] p-4">
                      <dt className="text-xs font-black uppercase tracking-[0.16em] text-white/34">الميزانية</dt>
                      <dd className="mt-2 text-base font-black text-white/82">{inquiry.budget || "غير محددة"}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 rounded-[8px] bg-black/24 p-4">
                    <p className="whitespace-pre-wrap text-base leading-8 text-white/68">{inquiry.message}</p>
                  </div>

                  {inquiry.page_path || inquiry.user_agent ? (
                    <div className="mt-4 grid gap-2 text-xs leading-5 text-white/34">
                      {inquiry.page_path ? <span>الصفحة: {inquiry.page_path}</span> : null}
                      {inquiry.user_agent ? <span className="break-all">المتصفح: {inquiry.user_agent}</span> : null}
                    </div>
                  ) : null}
                </div>

                <aside className="grid gap-3 rounded-[8px] border border-white/10 bg-black/24 p-4">
                  <form action={updateProjectInquiryStatus} className="grid gap-3">
                    <input type="hidden" name="inquiry_id" value={inquiry.id} />
                    <label className="grid gap-2 text-sm font-bold text-white/74">
                      حالة المتابعة
                      <select name="status" defaultValue={inquiry.status} className="admin-input">
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-black">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button type="submit" className="cinema-button cinema-button-primary min-h-11 justify-center">
                      <Save aria-hidden="true" />
                      حفظ الحالة
                    </button>
                  </form>

                  <DeleteProjectInquiryButton inquiryId={inquiry.id} inquiryTitle={inquiry.name} />
                </aside>
              </div>
            </article>
          );
        })}

        {inquiries.length ? null : (
          <div className="rounded-[8px] border border-white/10 bg-black/25 px-5 py-16 text-center">
            <Inbox aria-hidden="true" className="mx-auto text-[var(--brand-cyan)]" size={36} />
            <p className="mt-4 text-2xl font-black text-white">لا توجد طلبات حتى الآن</p>
            <p className="mt-3 text-white/48">عند إرسال أي عميل لفورم ابدأ مشروعك سيظهر الطلب هنا.</p>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
