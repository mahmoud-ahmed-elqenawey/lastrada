import Link from "next/link";
import { AdminLoginForm } from "@/app/admin/login/AdminLoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { error } = await searchParams;
  const isConfigured = isSupabaseConfigured();
  const decodedError = error ? decodeURIComponent(error) : "";
  const errorCopy =
    error === "config"
      ? "إعدادات الاتصال غير مكتملة."
      : decodedError
        ? decodedError.toLowerCase().includes("invalid")
          ? "البريد الإلكتروني أو كلمة المرور غير صحيحة."
          : decodedError
        : "";

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-10 text-white" dir="rtl" lang="ar">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <Link href="/en" className="mb-8 text-sm font-bold uppercase tracking-[0.18em] text-white/42">
          LA STRADA
        </Link>
        <section className="soft-panel rounded-[8px] p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-cyan)]">لوحة التحكم</p>
          <h1 className="mt-4 text-4xl font-black leading-none">تسجيل الدخول</h1>
          <p className="mt-4 text-sm leading-6 text-white/54">
            سجّل الدخول لإدارة المشاريع، الصور، الفيديوهات، ومحتوى دراسات الحالة بالعربي والإنجليزي.
          </p>

          <AdminLoginForm errorCopy={errorCopy} isConfigured={isConfigured} />
        </section>
      </div>
    </main>
  );
}
