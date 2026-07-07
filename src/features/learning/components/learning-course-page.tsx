"use client";

import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { LearnerAssessmentEntry } from "@/features/assessments/components/learner-assessment-entry";
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
import { useLearnerCourseAssessments } from "@/features/assessments/hooks/use-learner-course-assessments";

type LearningCoursePageProps = {
  activeLessonId?: string;
  course: CourseLearningResponse;
};

export function LearningCoursePage({
  activeLessonId,
  course,
}: LearningCoursePageProps) {
  const { accessToken } = useAuth();

  const searchParams = useSearchParams();

  const activeView = searchParams.get("view");
  const activeAssessmentId = searchParams.get("assessment") ?? undefined;

  const isViewingAssessmentList = activeView === "assessments";
  const isViewingAssessment = Boolean(activeAssessmentId);

  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);

  const sections = getOrderedSections(course.sections);
  const totals = getLearningTotals(sections);

  const {
    activeBundle,

    nextBundle,
    previousBundle,
  } = getLessonSelection(sections, activeLessonId);

  const {
    assessments,
    error: assessmentsError,
    isLoading: isAssessmentsLoading,
  } = useLearnerCourseAssessments({
    accessToken,
    courseId: course.id,
    enabled: Boolean(accessToken && course.id),
  });

  return (
    <div className="min-h-screen bg-surface-pearl text-foreground">
      <LearningTopBar
        course={course}
        onOpenCurriculum={() => setIsCurriculumOpen(true)}
        totals={totals}
      />

      <div className="mx-auto grid w-full max-w-[1500px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <main className="min-w-0">
          {isViewingAssessment && activeAssessmentId ? (
            accessToken ? (
              <LearnerAssessmentEntry
                accessToken={accessToken}
                assessmentId={activeAssessmentId}
                courseId={course.id}
                courseSlug={course.slug}
              />
            ) : (
              <AssessmentAuthRequired />
            )
          ) : isViewingAssessmentList ? (
            <CourseAssessmentList
              assessments={assessments}
              courseSlug={course.slug}
              error={assessmentsError}
              isLoading={isAssessmentsLoading}
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
            activeAssessmentId={activeAssessmentId}
            activeLessonId={
              isViewingAssessment ? undefined : activeBundle?.lesson.id
            }
            assessments={assessments}
            courseSlug={course.slug}
            sections={sections}
          />

          <AssessmentSidebarNotice
            error={assessmentsError}
            isLoading={isAssessmentsLoading}
          />
        </aside>
      </div>

      <button
        className="fixed bottom-4 left-4 right-4 z-30 inline-flex min-h-12 items-center justify-center rounded-md border border-primary bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary-focus lg:hidden"
        onClick={() => setIsCurriculumOpen(true)}
        type="button"
      >
        Open curriculum
      </button>

      {isCurriculumOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 bg-foreground/40 p-3 backdrop-blur-sm lg:hidden"
          role="dialog"
        >
          <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between gap-4 border-b border-border bg-background px-4 py-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Curriculum
                </p>

                <p className="truncate text-sm font-semibold">{course.title}</p>
              </div>

              <button
                className="shrink-0 rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                onClick={() => setIsCurriculumOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto p-4">
              <CourseCurriculumSidebar
                activeAssessmentId={activeAssessmentId}
                activeLessonId={
                  isViewingAssessment ? undefined : activeBundle?.lesson.id
                }
                assessments={assessments}
                courseSlug={course.slug}
                sections={sections}
              />

              <AssessmentSidebarNotice
                error={assessmentsError}
                isLoading={isAssessmentsLoading}
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
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 text-foreground shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1500px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          className="shrink-0 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          href="/my-courses"
        >
          Back
        </Link>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
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
          className="shrink-0 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary lg:hidden"
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
    <span className="rounded-md border border-border bg-background px-3 py-1">
      {value} {label}
    </span>
  );
}

function AssessmentSidebarNotice({
  error,
  isLoading,
}: {
  error?: string | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <p className="mt-3 rounded-md border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
        Loading assessments...
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-3 rounded-md border border-danger/20 bg-danger/5 px-3 py-2 text-xs text-danger">
        Unable to load assessments.
      </p>
    );
  }

  return null;
}

function AssessmentAuthRequired() {
  return (
    <section className="rounded-lg border border-border bg-card px-5 py-14 text-center shadow-sm">
      <p className="text-sm font-semibold text-primary">Assessment locked</p>

      <h2 className="mt-2 text-2xl font-semibold leading-tight">
        Please sign in to view this assessment.
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        Your session is required to load assessment attempts, history, and
        results.
      </p>

      <Link
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md border border-primary bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-focus"
        href="/login"
      >
        Go to login
      </Link>
    </section>
  );
}

function LessonNotFound({
  firstLessonHref,
}: {
  firstLessonHref: string | null;
}) {
  return (
    <section className="rounded-lg border border-border bg-card px-5 py-14 text-center shadow-sm">
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
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md border border-primary bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-focus"
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
    <section className="rounded-lg border border-border bg-card px-5 py-14 text-center shadow-sm">
      <p className="text-sm font-semibold text-primary">No lessons</p>

      <h2 className="mt-2 text-2xl font-semibold leading-tight">
        This course does not have learning content yet.
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        Check the course detail page for the latest course information.
      </p>

      <Link
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
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

function CourseAssessmentList({
  assessments,
  courseSlug,
  error,
  isLoading,
}: {
  assessments: Array<{
    id: string;
    title: string;
    description?: string | null;
    type: string;
    totalPoints: number;
    passingScore?: number | null;
    maxAttempts?: number | null;
    timeLimitMinutes?: number | null;
  }>;
  courseSlug: string;
  error?: string | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Loading assessments...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-danger/20 bg-danger/5 p-6">
        <p className="text-sm font-semibold text-danger">
          Unable to load assessments
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
      </section>
    );
  }

  if (assessments.length === 0) {
    return (
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm font-semibold">No assessments yet</p>
        <p className="mt-2 text-sm text-muted-foreground">
          This course does not have any assessments available.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Assessments
        </p>

        <h2 className="mt-2 text-2xl font-semibold">Course assessments</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Choose an assessment to view details, attempts, history, and start or
          continue.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        {assessments.map((assessment) => (
          <Link
            className="group rounded-xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
            href={`/courses/${courseSlug}/learn?assessment=${encodeURIComponent(
              assessment.id,
            )}`}
            key={assessment.id}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-pill border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                    {assessment.type === "PROJECT" ? "Project" : "Quiz"}
                  </span>

                  <span className="rounded-pill border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {assessment.totalPoints} pts
                  </span>
                </div>

                <h3 className="mt-3 break-words text-lg font-semibold text-foreground group-hover:text-primary">
                  {assessment.title}
                </h3>

                {assessment.description ? (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {assessment.description}
                  </p>
                ) : null}
              </div>

              <div className="grid shrink-0 gap-2 text-sm text-muted-foreground sm:text-right">
                <span>
                  Passing:{" "}
                  <strong className="text-foreground">
                    {assessment.passingScore ?? "No minimum"}
                  </strong>
                </span>

                <span>
                  Time:{" "}
                  <strong className="text-foreground">
                    {assessment.timeLimitMinutes
                      ? `${assessment.timeLimitMinutes} min`
                      : "No limit"}
                  </strong>
                </span>

                <span>
                  Attempts:{" "}
                  <strong className="text-foreground">
                    {assessment.maxAttempts ?? "Unlimited"}
                  </strong>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
