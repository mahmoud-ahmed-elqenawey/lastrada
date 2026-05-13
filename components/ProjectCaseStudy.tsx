import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ImageIcon } from "lucide-react";
import type { LaStradaContent, PortfolioMedia, PortfolioProject } from "@/lib/la-strada-i18n";
import { getAlternateLocale, getDirection, getLocalePath, type Locale } from "@/lib/locales";
import { getProjectCover, getProjectPath, getProjectSummary, getProjectTitle } from "@/lib/portfolio-projects";

function mediaPreviewSrc(media?: PortfolioMedia) {
  if (!media) return undefined;
  return media.type === "video" ? media.poster : media.src;
}

function MediaFrame({
  media,
  priority = false,
  className = "",
}: {
  media: PortfolioMedia;
  priority?: boolean;
  className?: string;
}) {
  if (media.type === "video") {
    return (
      <video
        className={`h-full w-full object-cover ${className}`}
        controls
        playsInline
        preload="metadata"
        poster={media.poster}
        aria-label={media.alt}
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      priority={priority}
      sizes="(min-width: 1280px) 42vw, (min-width: 768px) 48vw, 92vw"
      className={`object-cover ${className}`}
    />
  );
}

export function ProjectCaseStudy({
  content,
  locale,
  project,
}: {
  content: LaStradaContent;
  locale: Locale;
  project: PortfolioProject;
}) {
  const direction = getDirection(locale);
  const alternateLocale = getAlternateLocale(locale);
  const cover = getProjectCover(project);
  const coverPreview = mediaPreviewSrc(cover);
  const heroMedia =
    cover && coverPreview
      ? cover.type === "video" && cover.poster
        ? ({ type: "image", src: cover.poster, alt: cover.alt, label: cover.label } satisfies PortfolioMedia)
        : cover
      : undefined;
  const summary = getProjectSummary(project);
  const caseStudy = project.caseStudy;
  const gallery = project.media ?? (cover ? [cover] : []);
  const projectTitle = getProjectTitle(project);

  const copy = {
    back: locale === "ar" ? "العودة للأعمال" : "Back to work",
    switchLanguage: locale === "ar" ? "EN" : "AR",
    client: locale === "ar" ? "العميل" : "Client",
    service: locale === "ar" ? "الخدمة" : "Service",
    category: locale === "ar" ? "التصنيف" : "Category",
    overview: locale === "ar" ? "نظرة عامة" : "Overview",
    openProject: locale === "ar" ? "ابدأ مشروعك" : "Start your project",
    gallery: locale === "ar" ? "معرض المشروع" : "Project gallery",
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#050505] text-white" dir={direction} lang={locale}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(113,88,166,0.22),transparent_32rem),radial-gradient(circle_at_86%_44%,rgba(48,169,220,0.14),transparent_34rem),linear-gradient(180deg,#050505,#0a0908_48%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between gap-4 py-3">
          <Link
            href={`${getLocalePath(locale)}#portfolio`}
            className="cinema-button cinema-button-muted min-h-11 px-4"
          >
            <ArrowLeft aria-hidden="true" className={direction === "rtl" ? "-scale-x-100" : ""} size={18} />
            {copy.back}
          </Link>

          <div className="flex items-center gap-2">
            <Link href={getProjectPath(alternateLocale, project)} className="cinema-button cinema-button-muted min-h-11 px-4">
              {copy.switchLanguage}
            </Link>
            <Link
              href={content.contactSection.emailHref}
              className="cinema-button cinema-button-primary hidden min-h-11 px-4 sm:inline-flex"
            >
              {copy.openProject}
              <ArrowUpRight
                aria-hidden="true"
                className={direction === "rtl" ? "-scale-x-100" : ""}
                size={18}
              />
            </Link>
          </div>
        </header>

        <section className="grid flex-1 gap-10 py-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(21rem,0.74fr)] lg:items-center lg:py-20">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.16em]">
              <span className="text-[var(--brand-purple)]">{project.type}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
              <span className="text-white/42">{project.client}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
              <span className="font-mono text-white/34">{project.category}</span>
            </div>

            <h1 className="mt-6 max-w-5xl text-balance text-5xl font-black leading-[0.94] tracking-normal sm:text-7xl lg:text-8xl">
              {projectTitle}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">{summary}</p>

            <dl className="soft-panel mt-10 grid gap-4 rounded-[8px] p-5 sm:grid-cols-3 sm:p-6">
              {[
                [copy.client, project.client],
                [copy.service, project.type],
                [copy.category, project.category],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-black uppercase tracking-[0.16em] text-white/34">{label}</dt>
                  <dd className="mt-2 text-base font-bold text-white/86">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,var(--brand-yellow),transparent_62%)] opacity-10 blur-3xl" />
            <div className="soft-frame relative aspect-[9/14] overflow-hidden rounded-[8px]">
              {heroMedia ? (
                <MediaFrame media={heroMedia} priority />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_24%,var(--brand-purple),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.1),transparent_52%)] opacity-70" />
              )}
              <div className="absolute inset-x-5 bottom-5 z-10 rounded-full bg-black/44 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-white/74 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm">
                {caseStudy?.overviewTitle ?? copy.overview}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1fr]">
            <div>
              <h2 className="text-4xl font-black leading-none sm:text-5xl">{caseStudy?.overviewTitle ?? copy.overview}</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">{project.description}</p>
            </div>

            {caseStudy ? (
              <div className="grid gap-5">
                {[
                  [caseStudy.challengeTitle, caseStudy.challenge],
                  [caseStudy.solutionTitle, caseStudy.solution],
                ].map(([title, body]) => (
                  <article key={title} className="soft-row p-5 sm:p-6">
                    <h3 className="text-2xl font-black text-white">{title}</h3>
                    <p className="mt-4 text-base leading-8 text-white/62 sm:text-lg">{body}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>

          {caseStudy?.deliverables?.length ? (
            <div className="soft-panel mt-12 rounded-[8px] p-5 sm:p-6">
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white/40">
                {caseStudy.deliverablesTitle}
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {caseStudy.deliverables.map((deliverable) => (
                  <span
                    key={deliverable}
                    className="rounded-full bg-white/[0.035] px-4 py-2 text-sm font-bold text-white/76 shadow-[inset_0_1px_0_rgba(255,255,255,0.055)]"
                  >
                    {deliverable}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {gallery.length ? (
          <section className="py-16 lg:py-24">
            <div className="mb-8 flex items-center justify-between gap-4">
              <h2 className="text-4xl font-black leading-none sm:text-5xl">{caseStudy?.galleryTitle ?? copy.gallery}</h2>
              <span className="soft-icon flex h-12 w-12 items-center justify-center rounded-full text-white/50">
                <ImageIcon aria-hidden="true" size={20} />
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {gallery.map((item, index) => (
                <figure
                  key={`${item.src}-${index}`}
                  className="soft-frame relative aspect-[9/14] overflow-hidden rounded-[8px] md:aspect-[4/5]"
                >
                  <MediaFrame media={item} />
                  <figcaption className="absolute inset-x-4 bottom-4 z-10 rounded-full bg-black/44 px-4 py-2 text-center text-xs font-black uppercase tracking-[0.15em] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm">
                    {item.label ?? `${copy.gallery} ${index + 1}`}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className="pb-20">
          <div className="soft-panel grid gap-8 rounded-[8px] p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
            <div>
              <h2 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
                {caseStudy?.ctaTitle ?? content.finalCta.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">
                {caseStudy?.ctaBody ?? content.finalCta.body}
              </p>
            </div>
            <Link href={content.contactSection.emailHref} className="cinema-button cinema-button-primary w-fit">
              {caseStudy?.ctaLabel ?? content.finalCta.ctaLabel}
              <ArrowUpRight aria-hidden="true" className={direction === "rtl" ? "-scale-x-100" : ""} size={18} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
