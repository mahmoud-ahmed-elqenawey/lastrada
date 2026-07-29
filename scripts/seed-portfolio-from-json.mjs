import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const projectsDir = path.join(repoRoot, "messages", "projects");
const outputPath = path.join(repoRoot, "supabase", "seed-current-projects.sql");
const mediaBaseUrl =
  process.env.NEXT_PUBLIC_LA_STRADA_MEDIA_BASE_URL?.replace(/\/+$/, "") ??
  "https://pub-9152d84694a54c949533f907a0433921.r2.dev";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function sql(value) {
  if (value === undefined || value === null || value === "") return "null";
  return `'${String(value).replaceAll("'", "''")}'`;
}

function isAbsoluteOrLocalUrl(value) {
  return /^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(value) || value.startsWith("/") || value.startsWith("data:");
}

function resolveMediaUrl(src) {
  if (!src) return null;
  const cleanSrc = String(src).trim();
  if (!cleanSrc || isAbsoluteOrLocalUrl(cleanSrc)) return cleanSrc;
  return `${mediaBaseUrl}/${cleanSrc.replace(/^\/+/, "")}`;
}

function normalizeMedia(enProject, arProject) {
  const mediaBySrc = new Map();
  const coverSrc = resolveMediaUrl(enProject.cover?.src ?? arProject.cover?.src);

  function add(item, locale) {
    if (!item?.src) return;
    const src = resolveMediaUrl(item.src);
    const existing = mediaBySrc.get(src) ?? {
      type: item.type,
      src,
      poster: resolveMediaUrl(item.poster),
      alt_ar: "",
      alt_en: "",
      label_ar: null,
      label_en: null,
      is_cover: src === coverSrc,
    };

    existing.type = existing.type ?? item.type;
    existing.poster = existing.poster ?? resolveMediaUrl(item.poster);
    if (locale === "ar") {
      existing.alt_ar = item.alt ?? existing.alt_ar;
      existing.label_ar = item.label ?? existing.label_ar;
    } else {
      existing.alt_en = item.alt ?? existing.alt_en;
      existing.label_en = item.label ?? existing.label_en;
    }
    existing.is_cover = existing.is_cover || src === coverSrc;
    mediaBySrc.set(src, existing);
  }

  add(enProject.cover, "en");
  add(arProject.cover, "ar");
  enProject.media?.forEach((item) => add(item, "en"));
  arProject.media?.forEach((item) => add(item, "ar"));

  return [...mediaBySrc.values()].map((item, index) => ({
    ...item,
    alt_ar: item.alt_ar || item.alt_en || arProject.title,
    alt_en: item.alt_en || item.alt_ar || enProject.title,
    sort_order: index,
  }));
}

function translationRows(projectIdSql, project, locale) {
  const caseStudy = project.caseStudy ?? {};
  return `(${projectIdSql}, ${sql(locale)}, ${sql(project.title)}, ${sql(project.client)}, ${sql(project.type)}, ${sql(
    project.description,
  )}, ${sql(project.summary)}, ${sql(caseStudy.overviewTitle)}, ${sql(caseStudy.challengeTitle)}, ${sql(
    caseStudy.challenge,
  )}, ${sql(caseStudy.solutionTitle)}, ${sql(caseStudy.solution)}, ${sql(caseStudy.successTitle)}, ${sql(
    caseStudy.successStory,
  )}, ${sql(caseStudy.deliverablesTitle)}, ${sql(caseStudy.galleryTitle)}, ${sql(caseStudy.videoTitle)}, ${sql(
    caseStudy.ctaTitle,
  )}, ${sql(caseStudy.ctaBody)}, ${sql(caseStudy.ctaLabel)})`;
}

function projectSql({ enProject, arProject, sortOrder }) {
  const slug = enProject.slug;
  const media = normalizeMedia(enProject, arProject);
  const enDeliverables = enProject.caseStudy?.deliverables ?? [];
  const arDeliverables = arProject.caseStudy?.deliverables ?? [];
  const projectIdSql = "(select id from upsert_project)";

  const mediaValues = media
    .map(
      (item) =>
        `(${projectIdSql}, ${sql(item.type)}, ${sql(item.src)}, ${sql(item.poster)}, ${sql(item.alt_ar)}, ${sql(
          item.alt_en,
        )}, ${sql(item.label_ar)}, ${sql(item.label_en)}, ${item.is_cover ? "true" : "false"}, ${item.sort_order})`,
    )
    .join(",\n");
  const deliverableValues = [
    ...enDeliverables.map((label, index) => `(${projectIdSql}, 'en', ${sql(label)}, ${index})`),
    ...arDeliverables.map((label, index) => `(${projectIdSql}, 'ar', ${sql(label)}, ${index})`),
  ].join(",\n");

  return `
-- ${slug}
with upsert_project as (
  insert into public.projects (slug, status, category, accent, type, sort_order)
  values (${sql(slug)}, 'published', ${sql(enProject.category)}, ${sql(enProject.accent)}, ${sql(enProject.type)}, ${sortOrder})
  on conflict (slug) do update set
    status = excluded.status,
    category = excluded.category,
    accent = excluded.accent,
    type = excluded.type,
    sort_order = excluded.sort_order
  returning id
)
delete from public.project_media where project_id = ${projectIdSql};

with upsert_project as (select id from public.projects where slug = ${sql(slug)})
delete from public.project_deliverables where project_id = ${projectIdSql};

with upsert_project as (select id from public.projects where slug = ${sql(slug)})
delete from public.project_translations where project_id = ${projectIdSql};

with upsert_project as (select id from public.projects where slug = ${sql(slug)})
insert into public.project_translations (
  project_id, locale, title, client, type, description, summary, overview_title, challenge_title,
  challenge, solution_title, solution, success_title, success_story, deliverables_title,
  gallery_title, video_title, cta_title, cta_body, cta_label
)
values
${translationRows(projectIdSql, enProject, "en")},
${translationRows(projectIdSql, arProject, "ar")};
${
  deliverableValues
    ? `
with upsert_project as (select id from public.projects where slug = ${sql(slug)})
insert into public.project_deliverables (project_id, locale, label, sort_order)
values
${deliverableValues};
`
    : ""
}
${
  mediaValues
    ? `
with upsert_project as (select id from public.projects where slug = ${sql(slug)})
insert into public.project_media (project_id, type, src, poster, alt_ar, alt_en, label_ar, label_en, is_cover, sort_order)
values
${mediaValues};
`
    : ""
}`;
}

const folders = fs
  .readdirSync(projectsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const sqlParts = folders.map((folder, index) =>
  projectSql({
    enProject: readJson(path.join(projectsDir, folder, "en.json")),
    arProject: readJson(path.join(projectsDir, folder, "ar.json")),
    sortOrder: index,
  }),
);

fs.writeFileSync(
  outputPath,
  `-- Generated from messages/projects by scripts/seed-portfolio-from-json.mjs
-- Run in Supabase SQL Editor after supabase/schema.sql.

begin;
alter table public.project_translations add column if not exists type text;
${sqlParts.join("\n")}
commit;
`,
);

console.log(`Wrote ${path.relative(repoRoot, outputPath)} with ${folders.length} projects.`);
