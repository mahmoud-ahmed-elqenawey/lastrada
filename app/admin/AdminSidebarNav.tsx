"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgeCheck, FolderKanban, Inbox, MessageSquareQuote } from "lucide-react";

const navItems = [
  {
    href: "/admin",
    label: "المشاريع",
    icon: FolderKanban,
    isActive: (pathname: string) => pathname === "/admin" || pathname.startsWith("/admin/projects"),
  },
  {
    href: "/admin/brands",
    label: "البراندات",
    icon: BadgeCheck,
    isActive: (pathname: string) => pathname.startsWith("/admin/brands"),
  },
  {
    href: "/admin/testimonials",
    label: "آراء العملاء",
    icon: MessageSquareQuote,
    isActive: (pathname: string) => pathname.startsWith("/admin/testimonials"),
  },
  {
    href: "/admin/inquiries",
    label: "طلبات الموقع",
    icon: Inbox,
    isActive: (pathname: string) => pathname.startsWith("/admin/inquiries"),
  },
];

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-7 flex gap-2 overflow-x-auto lg:grid lg:overflow-visible" aria-label="روابط لوحة التحكم">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.isActive(pathname);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`admin-nav-link ${active ? "admin-nav-link-active" : ""}`}
          >
            <Icon aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
