import Link from "next/link";

import type { LearningSection } from "../types/learning-course";
import {
  getOrderedLessons,
  mediaTypeLabels,
  mediaTypeMarks,
  pickPrimaryFile,
} from "../utils/learning-course";

type CourseCurriculumSidebarProps = {
  activeLessonId?: string;
  courseSlug: string;
  onLessonClick?: () => void;
  sections: LearningSection[];
};

export function CourseCurriculumSidebar({
  activeLessonId,
  courseSlug,
  onLessonClick,
  sections,
}: CourseCurriculumSidebarProps) {
  return (
    <section className="rounded-lg border-2 border-foreground/80 bg-white p-4 shadow-[5px_5px_0_#1d1d1f]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary">Course content</p>
          <h2 className="mt-1 text-xl font-semibold leading-tight">
            Curriculum
          </h2>
        </div>
        <span className="shrink-0 rounded-pill border-2 border-foreground/80 bg-[#dff6ee] px-3 py-1 text-sm font-semibold">
          {sections.length}
        </span>
      </div>

      <nav aria-label="Course lessons" className="mt-4 grid gap-4">
        {sections.map((section, sectionIndex) => {
          const lessons = getOrderedLessons(section.lessons);
          const hasActiveLesson = lessons.some(
            (lesson) => lesson.id === activeLessonId,
          );

          return (
            <details
              className="rounded-md border-2 border-foreground/40 bg-[#fffdf7] p-3 open:border-foreground/80"
              key={section.id}
              open={hasActiveLesson || sectionIndex === 0}
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-foreground/80 bg-[#ffe8a3] text-sm font-semibold">
                    {sectionIndex + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-sm font-semibold leading-snug">
                      {section.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {lessons.length} lessons
                    </p>
                  </div>
                </div>
              </summary>

              {section.description ? (
                <p className="mt-3 border-l-2 border-dashed border-foreground/40 pl-3 text-xs leading-5 text-muted-foreground">
                  {section.description}
                </p>
              ) : null}

              <div className="mt-3 grid gap-2">
                {lessons.map((lesson, lessonIndex) => {
                  const isActive = lesson.id === activeLessonId;
                  const primaryFile = pickPrimaryFile(lesson.files);

                  return (
                    <Link
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "grid grid-cols-[32px_minmax(0,1fr)] gap-3 rounded-md border-2 p-3 text-left transition-transform active:translate-x-0.5 active:translate-y-0.5",
                        isActive
                          ? "border-foreground bg-[#ffe8a3] shadow-[3px_3px_0_#1d1d1f]"
                          : "border-foreground/30 bg-white hover:border-foreground/80",
                      ].join(" ")}
                      href={`/courses/${courseSlug}/learn?lesson=${encodeURIComponent(lesson.id)}`}
                      key={lesson.id}
                      onClick={onLessonClick}
                    >
                      <span className="grid size-8 place-items-center rounded-md border-2 border-foreground/70 bg-[#dff6ee] text-xs font-semibold">
                        {primaryFile
                          ? mediaTypeMarks[primaryFile.type]
                          : lessonIndex + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold text-ink-muted">
                          Lesson {lessonIndex + 1}
                        </span>
                        <span className="mt-1 block break-words text-sm font-semibold leading-snug">
                          {lesson.title}
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {primaryFile
                            ? mediaTypeLabels[primaryFile.type]
                            : "No files"}{" "}
                          - {lesson.files.length} files
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </details>
          );
        })}
      </nav>
    </section>
  );
}
