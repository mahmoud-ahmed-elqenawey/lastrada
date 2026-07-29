import Link from "next/link";
import { LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { signOutAdmin } from "@/app/admin/actions";
import { AdminSidebarNav } from "@/app/admin/AdminSidebarNav";

type AdminShellProps = {
  children: ReactNode;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function AdminShell({ children, eyebrow = "لوحة تحكم لاسترادا", title, subtitle, actions }: AdminShellProps) {
  return (
    <main className="min-h-screen bg-[#050505] text-white" dir="rtl" lang="ar">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_10%_8%,rgba(48,169,220,0.12),transparent_30rem),radial-gradient(circle_at_88%_18%,rgba(255,175,38,0.11),transparent_28rem),linear-gradient(180deg,#050505,#080808)]" />
      <div className="relative z-10 grid min-h-screen lg:grid-cols-[18rem_1fr]">
        <aside className="flex flex-col border-b border-white/10 bg-black/35 px-5 py-5 backdrop-blur-xl lg:min-h-screen lg:border-b-0 lg:border-e lg:px-6 lg:py-7">
          <div className="flex flex-wrap items-center justify-between gap-4 lg:block">
            <Link href="/admin" className="block">
              <span className="block text-xl font-black tracking-normal">LA STRADA</span>
              <span className="mt-1 block text-xs font-black uppercase tracking-[0.18em] text-white/38">لوحة المحتوى</span>
            </Link>
            <form action={signOutAdmin} className="lg:hidden">
              <button type="submit" className="cinema-button cinema-button-muted min-h-10 px-4 text-xs">
                <LogOut aria-hidden="true" />
                خروج
              </button>
            </form>
          </div>

          <AdminSidebarNav />

          <form action={signOutAdmin} className="mt-auto hidden pt-6 lg:block">
            <button type="submit" className="cinema-button cinema-button-muted w-full justify-center">
              <LogOut aria-hidden="true" />
              خروج
            </button>
          </form>
        </aside>

        <section className="px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          <header className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-cyan)]">{eyebrow}</p>
              <h1 className="mt-3 text-4xl font-black leading-none tracking-normal sm:text-5xl">{title}</h1>
              {subtitle ? <p className="mt-4 max-w-2xl text-sm leading-6 text-white/54 sm:text-base">{subtitle}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}
