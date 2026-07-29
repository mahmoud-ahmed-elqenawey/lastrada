export type SupabaseAccent = "blue" | "cyan" | "green" | "yellow" | "red" | "purple";
export type SupabaseProjectStatus = "draft" | "published";
export type SupabaseProjectInquiryStatus = "new" | "contacted" | "done" | "archived";
export type SupabaseLocale = "ar" | "en";
export type SupabaseMediaType = "image" | "video";
export type SupabaseProjectCategory =
  | "marketing_strategy"
  | "graphic_design"
  | "digital_development"
  | "content_production"
  | "social_media_management";

export type SupabaseProjectRow = {
  id: string;
  slug: string;
  status: SupabaseProjectStatus;
  category: SupabaseProjectCategory;
  accent: SupabaseAccent;
  type: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SupabaseProjectTranslationRow = {
  project_id: string;
  locale: SupabaseLocale;
  title: string;
  client: string;
  type: string | null;
  description: string;
  summary: string | null;
  overview_title: string | null;
  challenge_title: string | null;
  challenge: string | null;
  solution_title: string | null;
  solution: string | null;
  success_title: string | null;
  success_story: string | null;
  deliverables_title: string | null;
  gallery_title: string | null;
  video_title: string | null;
  cta_title: string | null;
  cta_body: string | null;
  cta_label: string | null;
};

export type SupabaseProjectDeliverableRow = {
  id: string;
  project_id: string;
  locale: SupabaseLocale;
  label: string;
  sort_order: number;
};

export type SupabaseProjectMediaRow = {
  id: string;
  project_id: string;
  type: SupabaseMediaType;
  src: string;
  poster: string | null;
  alt_ar: string;
  alt_en: string;
  label_ar: string | null;
  label_en: string | null;
  is_cover: boolean;
  sort_order: number;
  created_at: string;
};

export type SupabaseAdminUserRow = {
  user_id: string;
  email: string;
  created_at: string;
};

export type SupabaseFeaturedBrandRow = {
  id: string;
  name: string;
  category: string;
  summary: string;
  logo: string;
  accent: SupabaseAccent;
  status: SupabaseProjectStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SupabaseClientTestimonialRow = {
  id: string;
  status: SupabaseProjectStatus;
  accent: SupabaseAccent;
  author_ar: string;
  author_en: string;
  role_ar: string;
  role_en: string;
  company_ar: string;
  company_en: string;
  content_ar: string;
  content_en: string;
  video_src: string;
  poster_src: string | null;
  duration: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SupabaseProjectInquiryRow = {
  id: string;
  status: SupabaseProjectInquiryStatus;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  source_locale: SupabaseLocale;
  page_path: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
};

export type SupabaseProjectWithRelations = SupabaseProjectRow & {
  project_translations: SupabaseProjectTranslationRow[];
  project_media: SupabaseProjectMediaRow[];
  project_deliverables: SupabaseProjectDeliverableRow[];
};

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: SupabaseAdminUserRow;
        Insert: SupabaseAdminUserRow;
        Update: Partial<Omit<SupabaseAdminUserRow, "user_id" | "created_at">>;
        Relationships: [];
      };
      projects: {
        Row: SupabaseProjectRow;
        Insert: Partial<Pick<SupabaseProjectRow, "id" | "created_at" | "updated_at">> &
          Omit<SupabaseProjectRow, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<SupabaseProjectRow, "id" | "created_at" | "updated_at">>;
        Relationships: [];
      };
      project_translations: {
        Row: SupabaseProjectTranslationRow;
        Insert: SupabaseProjectTranslationRow;
        Update: Partial<Omit<SupabaseProjectTranslationRow, "project_id" | "locale">>;
        Relationships: [];
      };
      project_media: {
        Row: SupabaseProjectMediaRow;
        Insert: Partial<Pick<SupabaseProjectMediaRow, "id" | "created_at">> &
          Omit<SupabaseProjectMediaRow, "id" | "created_at">;
        Update: Partial<Omit<SupabaseProjectMediaRow, "id" | "created_at">>;
        Relationships: [];
      };
      project_deliverables: {
        Row: SupabaseProjectDeliverableRow;
        Insert: Partial<Pick<SupabaseProjectDeliverableRow, "id">> & Omit<SupabaseProjectDeliverableRow, "id">;
        Update: Partial<Omit<SupabaseProjectDeliverableRow, "id">>;
        Relationships: [];
      };
      featured_brands: {
        Row: SupabaseFeaturedBrandRow;
        Insert: Partial<Pick<SupabaseFeaturedBrandRow, "id" | "created_at" | "updated_at">> &
          Omit<SupabaseFeaturedBrandRow, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<SupabaseFeaturedBrandRow, "id" | "created_at" | "updated_at">>;
        Relationships: [];
      };
      client_testimonials: {
        Row: SupabaseClientTestimonialRow;
        Insert: Partial<Pick<SupabaseClientTestimonialRow, "id" | "created_at" | "updated_at">> &
          Omit<SupabaseClientTestimonialRow, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<SupabaseClientTestimonialRow, "id" | "created_at" | "updated_at">>;
        Relationships: [];
      };
      project_inquiries: {
        Row: SupabaseProjectInquiryRow;
        Insert: Partial<Pick<SupabaseProjectInquiryRow, "id" | "status" | "company" | "budget" | "page_path" | "user_agent" | "created_at" | "updated_at">> &
          Omit<SupabaseProjectInquiryRow, "id" | "status" | "company" | "budget" | "page_path" | "user_agent" | "created_at" | "updated_at">;
        Update: Partial<Omit<SupabaseProjectInquiryRow, "id" | "created_at" | "updated_at">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
