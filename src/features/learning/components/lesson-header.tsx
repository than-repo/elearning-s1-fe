import Link from "next/link";

import type { LessonBundle } from "../utils/learning-course";

type LessonHeaderProps = {
  courseSlug: string;
  lessonBundle: LessonBundle;
  nextBundle: LessonBundle | null;
  previousBundle: LessonBundle | null;
};

export function LessonHeader({
  courseSlug,
  lessonBundle,
  nextBundle,
  previousBundle,
}: LessonHeaderProps) {
  const { lesson, lessonNumber, section, sectionNumber } = lessonBundle;

  return (
    <section className="rounded-lg border-2 border-foreground/80 bg-white p-4 shadow-[5px_5px_0_#1d1d1f] sm:p-5">
      <div className="flex flex-wrap gap-2 text-sm font-semibold">
        <span className="rounded-pill border-2 border-foreground/80 bg-[#dff6ee] px-3 py-1">
          Section {sectionNumber}
        </span>
        <span className="rounded-pill border-2 border-foreground/80 bg-[#fffdf7] px-3 py-1">
          Lesson {lessonNumber}
        </span>
      </div>

      <h2 className="mt-4 break-words text-2xl font-semibold leading-tight sm:text-3xl">
        {lesson.title}
      </h2>
      <p className="mt-2 break-words text-sm font-semibold text-ink-muted">
        {section.title}
      </p>
      {lesson.description ? (
        <p className="mt-3 max-w-3xl whitespace-pre-line break-words text-base leading-7 text-muted-foreground">
          {lesson.description}
        </p>
      ) : null}

      <nav
        aria-label="Lesson navigation"
        className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        {previousBundle ? (
          <LessonNavigationLink
            href={getLessonHref(courseSlug, previousBundle.lesson.id)}
            label="Previous"
            title={previousBundle.lesson.title}
          />
        ) : (
          <DisabledNavigation label="Previous" />
        )}

        {nextBundle ? (
          <LessonNavigationLink
            align="right"
            href={getLessonHref(courseSlug, nextBundle.lesson.id)}
            label="Next"
            title={nextBundle.lesson.title}
          />
        ) : (
          <DisabledNavigation align="right" label="Next" />
        )}
      </nav>
    </section>
  );
}

function LessonNavigationLink({
  align = "left",
  href,
  label,
  title,
}: {
  align?: "left" | "right";
  href: string;
  label: string;
  title: string;
}) {
  return (
    <Link
      className={[
        "min-h-14 rounded-md border-2 border-foreground/80 bg-[#ffe8a3] px-4 py-2 text-sm font-semibold shadow-[3px_3px_0_#1d1d1f] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:max-w-[48%]",
        align === "right" ? "text-left sm:text-right" : "text-left",
      ].join(" ")}
      href={href}
    >
      <span className="block text-xs uppercase text-ink-muted">{label}</span>
      <span className="mt-1 block truncate">{title}</span>
    </Link>
  );
}

function DisabledNavigation({
  align = "left",
  label,
}: {
  align?: "left" | "right";
  label: string;
}) {
  return (
    <span
      className={[
        "min-h-14 rounded-md border-2 border-foreground/25 bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground sm:max-w-[48%]",
        align === "right" ? "text-left sm:text-right" : "text-left",
      ].join(" ")}
    >
      <span className="block text-xs uppercase">{label}</span>
      <span className="mt-1 block">Unavailable</span>
    </span>
  );
}

function getLessonHref(courseSlug: string, lessonId: string) {
  return `/courses/${courseSlug}/learn?lesson=${encodeURIComponent(lessonId)}`;
}
