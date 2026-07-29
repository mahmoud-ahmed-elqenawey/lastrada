"use server";

import { redirect } from "next/navigation";
import { getServiceCategoryLabel, isServiceCategory } from "@/lib/service-taxonomy";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  SupabaseAccent,
  SupabaseMediaType,
  SupabaseProjectCategory,
  SupabaseProjectInquiryStatus,
  SupabaseProjectStatus,
} from "@/lib/supabase/types";

const validAccents: SupabaseAccent[] = ["blue", "cyan", "green", "yellow", "red", "purple"];
const validStatuses: SupabaseProjectStatus[] = ["draft", "published"];
const validInquiryStatuses: SupabaseProjectInquiryStatus[] = ["new", "contacted", "done", "archived"];
const validMediaTypes: SupabaseMediaType[] = ["image", "video"];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readNumber(formData: FormData, key: string, fallback = 0) {
  const value = Number(readString(formData, key));
  return Number.isFinite(value) ? value : fallback;
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function inferMediaType(url: string): SupabaseMediaType {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url) ? "video" : "image";
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function assertRequired(formData: FormData, key: string, label: string) {
  if (!readString(formData, key)) {
    throw new Error(`${label} مطلوب.`);
  }
}

function validateProjectForm(formData: FormData) {
  const slug = readString(formData, "slug");
  const accent = readString(formData, "accent") as SupabaseAccent;
  const category = readString(formData, "category");
  const status = readString(formData, "status") as SupabaseProjectStatus;
  const coverType = readString(formData, "cover_type") as SupabaseMediaType;
  const coverSrc = readString(formData, "cover_src");
  const coverPoster = readString(formData, "cover_poster");
  const galleryUrls = splitLines(readString(formData, "gallery_urls"));
  const sortOrder = readNumber(formData, "sort_order", -1);

  if (!slugPattern.test(slug)) {
    throw new Error("رابط صفحة المشروع يجب أن يحتوي على حروف إنجليزية صغيرة وأرقام وشرطات فقط.");
  }

  if (!validAccents.includes(accent)) {
    throw new Error("قيمة لون التمييز غير صحيحة.");
  }

  if (!isServiceCategory(category)) {
    throw new Error("نوع الخدمة غير صحيح.");
  }

  if (!validStatuses.includes(status)) {
    throw new Error("حالة المشروع غير صحيحة.");
  }

  if (!validMediaTypes.includes(coverType)) {
    throw new Error("نوع ملف الغلاف غير صحيح.");
  }

  if (sortOrder < 0) {
    throw new Error("ترتيب الظهور يجب أن يكون صفر أو أكبر.");
  }

  [
    ["title_en", "العنوان الإنجليزي"],
    ["client_en", "العميل بالإنجليزي"],
    ["description_en", "الوصف الإنجليزي"],
    ["title_ar", "العنوان العربي"],
    ["client_ar", "العميل بالعربي"],
    ["description_ar", "الوصف العربي"],
  ].forEach(([key, label]) => assertRequired(formData, key, label));

  if (coverSrc && !isValidHttpUrl(coverSrc)) {
    throw new Error("رابط ملف الغلاف الرئيسي غير صحيح.");
  }

  if (coverPoster && !isValidHttpUrl(coverPoster)) {
    throw new Error("رابط صورة معاينة الغلاف غير صحيح.");
  }

  galleryUrls.forEach((url) => {
    if (!isValidHttpUrl(url)) {
      throw new Error("يوجد رابط غير صحيح داخل صور وفيديوهات المعرض.");
    }
  });
}

function readProjectCategory(formData: FormData) {
  return readString(formData, "category") as SupabaseProjectCategory;
}

function getProjectTypeLabel(formData: FormData, locale: "ar" | "en") {
  return getServiceCategoryLabel(readProjectCategory(formData), locale);
}

async function getConfiguredSupabase() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/admin/login?error=config");
  }

  return supabase;
}

export async function signInAdmin(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  const email = readString(formData, "email");
  const password = readString(formData, "password");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await getConfiguredSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function buildTranslations(formData: FormData, projectId: string) {
  return [
    {
      project_id: projectId,
      locale: "en" as const,
      title: readString(formData, "title_en"),
      client: readString(formData, "client_en"),
      type: getProjectTypeLabel(formData, "en"),
      description: readString(formData, "description_en"),
      summary: readString(formData, "summary_en") || null,
      overview_title: readString(formData, "overview_title_en") || null,
      challenge_title: readString(formData, "challenge_title_en") || null,
      challenge: readString(formData, "challenge_en") || null,
      solution_title: readString(formData, "solution_title_en") || null,
      solution: readString(formData, "solution_en") || null,
      success_title: readString(formData, "success_title_en") || null,
      success_story: readString(formData, "success_story_en") || null,
      deliverables_title: readString(formData, "deliverables_title_en") || null,
      gallery_title: readString(formData, "gallery_title_en") || null,
      video_title: readString(formData, "video_title_en") || null,
      cta_title: readString(formData, "cta_title_en") || null,
      cta_body: readString(formData, "cta_body_en") || null,
      cta_label: readString(formData, "cta_label_en") || null,
    },
    {
      project_id: projectId,
      locale: "ar" as const,
      title: readString(formData, "title_ar"),
      client: readString(formData, "client_ar"),
      type: getProjectTypeLabel(formData, "ar"),
      description: readString(formData, "description_ar"),
      summary: readString(formData, "summary_ar") || null,
      overview_title: readString(formData, "overview_title_ar") || null,
      challenge_title: readString(formData, "challenge_title_ar") || null,
      challenge: readString(formData, "challenge_ar") || null,
      solution_title: readString(formData, "solution_title_ar") || null,
      solution: readString(formData, "solution_ar") || null,
      success_title: readString(formData, "success_title_ar") || null,
      success_story: readString(formData, "success_story_ar") || null,
      deliverables_title: readString(formData, "deliverables_title_ar") || null,
      gallery_title: readString(formData, "gallery_title_ar") || null,
      video_title: readString(formData, "video_title_ar") || null,
      cta_title: readString(formData, "cta_title_ar") || null,
      cta_body: readString(formData, "cta_body_ar") || null,
      cta_label: readString(formData, "cta_label_ar") || null,
    },
  ];
}

function buildDeliverables(formData: FormData, projectId: string) {
  return [
    ...splitLines(readString(formData, "deliverables_en")).map((label, index) => ({
      project_id: projectId,
      locale: "en" as const,
      label,
      sort_order: index,
    })),
    ...splitLines(readString(formData, "deliverables_ar")).map((label, index) => ({
      project_id: projectId,
      locale: "ar" as const,
      label,
      sort_order: index,
    })),
  ];
}

function buildMediaRows(formData: FormData, projectId: string) {
  const coverSrc = readString(formData, "cover_src");
  return [
    ...(coverSrc
      ? [
          {
            project_id: projectId,
            type: readString(formData, "cover_type") as SupabaseMediaType,
            src: coverSrc,
            poster: readString(formData, "cover_poster") || null,
            alt_ar: readString(formData, "cover_alt_ar") || readString(formData, "title_ar"),
            alt_en: readString(formData, "cover_alt_en") || readString(formData, "title_en"),
            label_ar: null,
            label_en: null,
            is_cover: true,
            sort_order: 0,
          },
        ]
      : []),
    ...splitLines(readString(formData, "gallery_urls")).map((src, index) => ({
      project_id: projectId,
      type: inferMediaType(src),
      src,
      poster: null,
      alt_ar: readString(formData, "title_ar"),
      alt_en: readString(formData, "title_en"),
      label_ar: null,
      label_en: null,
      is_cover: false,
      sort_order: index + 1,
    })),
  ];
}

async function replaceProjectRelations(supabase: Awaited<ReturnType<typeof getConfiguredSupabase>>, formData: FormData, projectId: string) {
  const { error: deleteMediaError } = await supabase.from("project_media").delete().eq("project_id", projectId);
  if (deleteMediaError) throw new Error(deleteMediaError.message);

  const { error: deleteDeliverablesError } = await supabase.from("project_deliverables").delete().eq("project_id", projectId);
  if (deleteDeliverablesError) throw new Error(deleteDeliverablesError.message);

  const { error: deleteTranslationsError } = await supabase.from("project_translations").delete().eq("project_id", projectId);
  if (deleteTranslationsError) throw new Error(deleteTranslationsError.message);

  const { error: translationError } = await supabase.from("project_translations").insert(buildTranslations(formData, projectId));
  if (translationError) throw new Error(translationError.message);

  const deliverables = buildDeliverables(formData, projectId);
  if (deliverables.length) {
    const { error } = await supabase.from("project_deliverables").insert(deliverables);
    if (error) throw new Error(error.message);
  }

  const mediaRows = buildMediaRows(formData, projectId);

  if (mediaRows.length) {
    const { error } = await supabase.from("project_media").insert(mediaRows);
    if (error) {
      throw new Error(error.message);
    }
  }
}

export async function createProject(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  validateProjectForm(formData);
  const slug = readString(formData, "slug");

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert({
      slug,
      status: readString(formData, "status") as SupabaseProjectStatus,
      category: readProjectCategory(formData),
      accent: readString(formData, "accent") as SupabaseAccent,
      type: getProjectTypeLabel(formData, "en"),
      sort_order: readNumber(formData, "sort_order"),
    })
    .select("id")
    .single();

  if (projectError || !project) {
    throw new Error(projectError?.message ?? "تعذر إنشاء المشروع.");
  }

  await replaceProjectRelations(supabase, formData, project.id);

  redirect("/admin?created=1");
}

export async function updateProject(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  validateProjectForm(formData);
  const projectId = readString(formData, "project_id");

  if (!projectId) {
    throw new Error("معرّف المشروع غير موجود.");
  }

  const { error: projectError } = await supabase
    .from("projects")
    .update({
      slug: readString(formData, "slug"),
      status: readString(formData, "status") as SupabaseProjectStatus,
      category: readProjectCategory(formData),
      accent: readString(formData, "accent") as SupabaseAccent,
      type: getProjectTypeLabel(formData, "en"),
      sort_order: readNumber(formData, "sort_order"),
    })
    .eq("id", projectId);

  if (projectError) {
    throw new Error(projectError.message);
  }

  await replaceProjectRelations(supabase, formData, projectId);

  redirect("/admin?updated=1");
}

export async function deleteProject(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  const projectId = readString(formData, "project_id");

  if (!projectId) {
    throw new Error("معرّف المشروع غير موجود.");
  }

  const { error } = await supabase.from("projects").delete().eq("id", projectId);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin?deleted=1");
}

function validateFeaturedBrandForm(formData: FormData) {
  const name = readString(formData, "name");
  const logo = readString(formData, "logo");
  const accent = readString(formData, "accent") as SupabaseAccent;
  const status = readString(formData, "status") as SupabaseProjectStatus;
  const sortOrder = readNumber(formData, "sort_order", -1);

  if (!name) {
    throw new Error("اسم البراند مطلوب.");
  }

  if (!logo || !isValidHttpUrl(logo)) {
    throw new Error("لوجو البراند مطلوب ويجب أن يكون رابط صحيح.");
  }

  if (!validAccents.includes(accent)) {
    throw new Error("قيمة لون التمييز غير صحيحة.");
  }

  if (!validStatuses.includes(status)) {
    throw new Error("حالة البراند غير صحيحة.");
  }

  if (sortOrder < 0) {
    throw new Error("ترتيب الظهور يجب أن يكون صفر أو أكبر.");
  }
}

export async function createFeaturedBrand(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  validateFeaturedBrandForm(formData);

  const { error } = await supabase.from("featured_brands").insert({
    name: readString(formData, "name"),
    category: readString(formData, "category"),
    summary: readString(formData, "summary"),
    logo: readString(formData, "logo"),
    accent: readString(formData, "accent") as SupabaseAccent,
    status: readString(formData, "status") as SupabaseProjectStatus,
    sort_order: readNumber(formData, "sort_order"),
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/brands?created=1");
}

export async function updateFeaturedBrand(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  validateFeaturedBrandForm(formData);
  const brandId = readString(formData, "brand_id");

  if (!brandId) {
    throw new Error("معرّف البراند غير موجود.");
  }

  const { error } = await supabase
    .from("featured_brands")
    .update({
      name: readString(formData, "name"),
      category: readString(formData, "category"),
      summary: readString(formData, "summary"),
      logo: readString(formData, "logo"),
      accent: readString(formData, "accent") as SupabaseAccent,
      status: readString(formData, "status") as SupabaseProjectStatus,
      sort_order: readNumber(formData, "sort_order"),
    })
    .eq("id", brandId);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/brands?updated=1");
}

export async function deleteFeaturedBrand(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  const brandId = readString(formData, "brand_id");

  if (!brandId) {
    throw new Error("معرّف البراند غير موجود.");
  }

  const { error } = await supabase.from("featured_brands").delete().eq("id", brandId);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/brands?deleted=1");
}

function validateClientTestimonialForm(formData: FormData) {
  const accent = readString(formData, "accent") as SupabaseAccent;
  const status = readString(formData, "status") as SupabaseProjectStatus;
  const sortOrder = readNumber(formData, "sort_order", -1);
  const videoSrc = readString(formData, "video_src");
  const posterSrc = readString(formData, "poster_src");

  [
    ["author_ar", "اسم العميل بالعربي"],
    ["author_en", "اسم العميل بالإنجليزي"],
    ["role_ar", "وصف الخدمة بالعربي"],
    ["role_en", "وصف الخدمة بالإنجليزي"],
    ["company_ar", "اسم الشركة بالعربي"],
    ["company_en", "اسم الشركة بالإنجليزي"],
    ["content_ar", "نص الرأي بالعربي"],
    ["content_en", "نص الرأي بالإنجليزي"],
    ["duration", "مدة الفيديو"],
  ].forEach(([key, label]) => assertRequired(formData, key, label));

  if (!videoSrc || !isValidHttpUrl(videoSrc)) {
    throw new Error("فيديو الرأي مطلوب ويجب أن يكون رابط صحيح.");
  }

  if (posterSrc && !isValidHttpUrl(posterSrc)) {
    throw new Error("صورة معاينة الفيديو يجب أن تكون رابط صحيح.");
  }

  if (!validAccents.includes(accent)) {
    throw new Error("قيمة لون التمييز غير صحيحة.");
  }

  if (!validStatuses.includes(status)) {
    throw new Error("حالة الرأي غير صحيحة.");
  }

  if (sortOrder < 0) {
    throw new Error("ترتيب الظهور يجب أن يكون صفر أو أكبر.");
  }
}

function buildClientTestimonialPayload(formData: FormData) {
  return {
    status: readString(formData, "status") as SupabaseProjectStatus,
    accent: readString(formData, "accent") as SupabaseAccent,
    author_ar: readString(formData, "author_ar"),
    author_en: readString(formData, "author_en"),
    role_ar: readString(formData, "role_ar"),
    role_en: readString(formData, "role_en"),
    company_ar: readString(formData, "company_ar"),
    company_en: readString(formData, "company_en"),
    content_ar: readString(formData, "content_ar"),
    content_en: readString(formData, "content_en"),
    video_src: readString(formData, "video_src"),
    poster_src: readString(formData, "poster_src") || null,
    duration: readString(formData, "duration"),
    sort_order: readNumber(formData, "sort_order"),
  };
}

export async function createClientTestimonial(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  validateClientTestimonialForm(formData);

  const { error } = await supabase.from("client_testimonials").insert(buildClientTestimonialPayload(formData));

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/testimonials?created=1");
}

export async function updateClientTestimonial(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  validateClientTestimonialForm(formData);
  const testimonialId = readString(formData, "testimonial_id");

  if (!testimonialId) {
    throw new Error("معرّف رأي العميل غير موجود.");
  }

  const { error } = await supabase.from("client_testimonials").update(buildClientTestimonialPayload(formData)).eq("id", testimonialId);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/testimonials?updated=1");
}

export async function deleteClientTestimonial(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  const testimonialId = readString(formData, "testimonial_id");

  if (!testimonialId) {
    throw new Error("معرّف رأي العميل غير موجود.");
  }

  const { error } = await supabase.from("client_testimonials").delete().eq("id", testimonialId);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/testimonials?deleted=1");
}

export async function updateProjectInquiryStatus(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  const inquiryId = readString(formData, "inquiry_id");
  const status = readString(formData, "status") as SupabaseProjectInquiryStatus;

  if (!inquiryId) {
    throw new Error("معرّف الطلب غير موجود.");
  }

  if (!validInquiryStatuses.includes(status)) {
    throw new Error("حالة الطلب غير صحيحة.");
  }

  const { error } = await supabase.from("project_inquiries").update({ status }).eq("id", inquiryId);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/inquiries?updated=1");
}

export async function deleteProjectInquiry(formData: FormData) {
  const supabase = await getConfiguredSupabase();
  const inquiryId = readString(formData, "inquiry_id");

  if (!inquiryId) {
    throw new Error("معرّف الطلب غير موجود.");
  }

  const { error } = await supabase.from("project_inquiries").delete().eq("id", inquiryId);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/inquiries?deleted=1");
}
