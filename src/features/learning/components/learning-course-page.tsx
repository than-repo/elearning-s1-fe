"use client";

import Link from "next/link";
import { useState } from "react";

import type { CourseLearningResponse } from "../types/learning-course";
import {
  getLearningTotals,
  getLessonSelection,
  getOrderedSections,
} from "../utils/learning-course";
import { CourseCurriculumSidebar } from "./course-curriculum-sidebar";
import { LessonContentViewer } from "./lesson-content-viewer";
import { LessonHeader } from "./lesson-header";
import { LessonTabs } from "./lesson-tabs";

type LearningCoursePageProps = {
  activeLessonId?: string;
  course: CourseLearningResponse;
};

export function LearningCoursePage({
  activeLessonId,
  course,
}: LearningCoursePageProps) {
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const sections = getOrderedSections(course.sections);
  const totals = getLearningTotals(sections);
  const {
    activeBundle,
    firstBundle,
    isRequestedLessonMissing,
    nextBundle,
    previousBundle,
  } = getLessonSelection(sections, activeLessonId);

  return (
    <div className="min-h-screen bg-[#fffdf7] text-foreground">
      <LearningTopBar
        course={course}
        onOpenCurriculum={() => setIsCurriculumOpen(true)}
        totals={totals}
      />

      <div className="mx-auto grid w-full max-w-[1500px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <main className="min-w-0">
          {isRequestedLessonMissing ? (
            <LessonNotFound
              firstLessonHref={
                firstBundle
                  ? getLessonHref(course.slug, firstBundle.lesson.id)
                  : null
              }
            />
          ) : activeBundle ? (
            <div className="grid gap-5">
              <LessonContentViewer
                lesson={activeBundle.lesson}
                sectionTitle={activeBundle.section.title}
              />
              <LessonHeader
                courseSlug={course.slug}
                lessonBundle={activeBundle}
                nextBundle={nextBundle}
                previousBundle={previousBundle}
              />
              <LessonTabs lesson={activeBundle.lesson} />
            </div>
          ) : (
            <EmptyCourseState courseSlug={course.slug} />
          )}
        </main>

        <aside
          aria-label="Course curriculum"
          className="hidden min-w-0 lg:sticky lg:top-[88px] lg:block lg:max-h-[calc(100vh-110px)] lg:self-start lg:overflow-y-auto"
        >
          <CourseCurriculumSidebar
            activeLessonId={activeBundle?.lesson.id}
            courseSlug={course.slug}
            sections={sections}
          />
        </aside>
      </div>

      <button
        className="fixed bottom-4 left-4 right-4 z-30 inline-flex min-h-12 items-center justify-center rounded-pill border-2 border-foreground/80 bg-[#ffe8a3] px-5 text-sm font-semibold text-foreground shadow-[4px_4px_0_#1d1d1f] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none lg:hidden"
        onClick={() => setIsCurriculumOpen(true)}
        type="button"
      >
        Open curriculum
      </button>

      {isCurriculumOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 bg-foreground/30 p-3 lg:hidden"
          role="dialog"
        >
          <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-foreground/80 bg-[#fffdf7] shadow-[5px_5px_0_#1d1d1f]">
            <div className="flex items-center justify-between gap-4 border-b-2 border-foreground/80 bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-primary">
                  Curriculum
                </p>
                <p className="truncate text-sm font-semibold">{course.title}</p>
              </div>
              <button
                className="shrink-0 rounded-pill border-2 border-foreground/80 bg-[#ffe1e1] px-4 py-2 text-sm font-semibold shadow-[2px_2px_0_#1d1d1f] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                onClick={() => setIsCurriculumOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>
            <div className="min-h-0 overflow-y-auto p-4">
              <CourseCurriculumSidebar
                activeLessonId={activeBundle?.lesson.id}
                courseSlug={course.slug}
                onLessonClick={() => setIsCurriculumOpen(false)}
                sections={sections}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function LearningTopBar({
  course,
  onOpenCurriculum,
  totals,
}: {
  course: CourseLearningResponse;
  onOpenCurriculum: () => void;
  totals: { fileCount: number; lessonCount: number; sectionCount: number };
}) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-foreground/80 bg-[#f8f1d8] text-foreground">
      <div className="mx-auto flex w-full max-w-[1500px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          className="shrink-0 rounded-pill border-2 border-foreground/80 bg-white px-4 py-2 text-sm font-semibold shadow-[2px_2px_0_#1d1d1f] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          href="/my-courses"
        >
          Back
        </Link>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase text-primary">
            Learning workspace
          </p>
          <h1 className="truncate text-base font-semibold leading-tight sm:text-lg">
            {course.title}
          </h1>
        </div>
        <div className="hidden shrink-0 items-center gap-2 text-xs font-semibold sm:flex">
          <TopBarStat label="Sections" value={totals.sectionCount} />
          <TopBarStat label="Lessons" value={totals.lessonCount} />
          <TopBarStat label="Files" value={totals.fileCount} />
        </div>
        <button
          className="shrink-0 rounded-pill border-2 border-foreground/80 bg-[#dff6ee] px-4 py-2 text-sm font-semibold shadow-[2px_2px_0_#1d1d1f] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none lg:hidden"
          onClick={onOpenCurriculum}
          type="button"
        >
          Lessons
        </button>
      </div>
    </header>
  );
}

function TopBarStat({ label, value }: { label: string; value: number }) {
  return (
    <span className="rounded-pill border-2 border-foreground/80 bg-white px-3 py-1">
      {value} {label}
    </span>
  );
}

function LessonNotFound({
  firstLessonHref,
}: {
  firstLessonHref: string | null;
}) {
  return (
    <section className="rounded-lg border-2 border-foreground/80 bg-white px-5 py-14 text-center shadow-[5px_5px_0_#1d1d1f]">
      <p className="text-sm font-semibold text-primary">Lesson not found</p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight">
        This lesson is not available.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        The lesson link may be stale, or this lesson is no longer part of the
        published course content.
      </p>
      {firstLessonHref ? (
        <Link
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-pill border-2 border-foreground/80 bg-[#ffe8a3] px-5 text-sm font-semibold shadow-[3px_3px_0_#1d1d1f] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          href={firstLessonHref}
        >
          Open first lesson
        </Link>
      ) : null}
    </section>
  );
}

function EmptyCourseState({ courseSlug }: { courseSlug: string }) {
  return (
    <section className="rounded-lg border-2 border-foreground/80 bg-white px-5 py-14 text-center shadow-[5px_5px_0_#1d1d1f]">
      <p className="text-sm font-semibold text-primary">No lessons</p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight">
        This course does not have learning content yet.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        Check the course detail page for the latest course information.
      </p>
      <Link
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-pill border-2 border-foreground/80 bg-[#ffe8a3] px-5 text-sm font-semibold shadow-[3px_3px_0_#1d1d1f] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        href={`/courses/${courseSlug}`}
      >
        Back to course
      </Link>
    </section>
  );
}

function getLessonHref(courseSlug: string, lessonId: string) {
  return `/courses/${courseSlug}/learn?lesson=${encodeURIComponent(lessonId)}`;
}
