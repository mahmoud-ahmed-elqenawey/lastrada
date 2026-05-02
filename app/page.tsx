import { redirect } from "next/navigation";
import { defaultLocale, getLocalePath } from "@/lib/locales";

export default function Home() {
  redirect(getLocalePath(defaultLocale));
}
