"use client";

import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { signInAdmin } from "@/app/admin/actions";

export function AdminLoginForm({
  errorCopy,
  isConfigured,
}: {
  errorCopy: string;
  isConfigured: boolean;
}) {
  const router = useRouter();
  const [visibleError, setVisibleError] = useState(errorCopy);

  function clearError() {
    if (!visibleError) return;
    setVisibleError("");
    router.replace("/admin/login", { scroll: false });
  }

  return (
    <>
      {!isConfigured || visibleError ? (
        <div className="mt-6 rounded-[8px] border border-red-400/30 bg-red-500/10 p-4 text-sm font-bold text-red-100">
          {!isConfigured ? "لوحة التحكم غير جاهزة حاليا. تواصل مع المطور لمراجعة إعدادات الاتصال." : visibleError}
        </div>
      ) : null}

      <form action={signInAdmin} className="mt-8 grid gap-4">
        <label className="grid gap-2 text-sm font-bold text-white/74">
          <span>
            البريد الإلكتروني <span className="text-red-300">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            onChange={clearError}
            className="min-h-12 rounded-[8px] border border-white/10 bg-white/[0.055] px-4 text-white outline-none transition focus:border-[var(--brand-cyan)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-white/74">
          <span>
            كلمة المرور <span className="text-red-300">*</span>
          </span>
          <input
            name="password"
            type="password"
            required
            onChange={clearError}
            className="min-h-12 rounded-[8px] border border-white/10 bg-white/[0.055] px-4 text-white outline-none transition focus:border-[var(--brand-cyan)]"
          />
        </label>
        <button type="submit" className="cinema-button cinema-button-primary mt-2 min-h-12 justify-center">
          <LogIn aria-hidden="true" />
          تسجيل الدخول
        </button>
      </form>
    </>
  );
}
