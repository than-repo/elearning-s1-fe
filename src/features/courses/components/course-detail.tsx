import type { ReactNode } from "react";

import type { PublicCourse } from "../types/course";
import {
  formatCourseDuration,
  formatCourseLevel,
  formatCoursePrice,
} from "../utils/course-data";
import { CourseImage } from "./course-image";

type CourseDetailProps = {
  course: PublicCourse;
  enrollmentPanel?: ReactNode;
};

export function CourseDetail({ course, enrollmentPanel }: CourseDetailProps) {
  const primaryInstructor = course.instructors?.[0]?.fullName;
  const categoryNames = course.categories?.map((category) => category.name) ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <article className="grid gap-5">
        <section className="rounded-lg border border-border bg-card p-5">
          <CourseImage course={course} />
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-pill bg-muted px-3 py-1 text-sm text-ink-muted">
              {formatCourseLevel(course.level)}
            </span>
            {course.certificateEnabled ? (
              <span className="rounded-pill bg-primary/10 px-3 py-1 text-sm text-primary">
                Certificate
              </span>
            ) : null}
            {categoryNames.slice(0, 3).map((categoryName) => (
              <span
                className="rounded-pill border border-border px-3 py-1 text-sm text-muted-foreground"
                key={categoryName}
              >
                {categoryName}
              </span>
            ))}
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            {course.shortDescription}
          </p>
        </section>

        <aside className="rounded-lg border border-border bg-card p-5 lg:hidden">
          <CourseFacts course={course} primaryInstructor={primaryInstructor} />
          {enrollmentPanel}
        </aside>

        <section className="rounded-lg border border-border bg-card p-5">
          <SectionTitle title="About this course" />
          {course.description ? (
            <p className="mt-3 whitespace-pre-line leading-7 text-muted-foreground">
              {course.description}
            </p>
          ) : (
            <p className="mt-3 leading-7 text-muted-foreground">
              This course description is not available yet.
            </p>
          )}
        </section>

        {course.whatYouWillLearn?.length ? (
          <section className="rounded-lg border border-border bg-card p-5">
            <SectionTitle title="What you will learn" />
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
              {course.whatYouWillLearn.map((item) => (
                <li className="rounded-md bg-muted px-4 py-3" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {course.requirements?.length ? (
          <section className="rounded-lg border border-border bg-card p-5">
            <SectionTitle title="Requirements" />
            <ul className="mt-4 grid gap-3 text-muted-foreground">
              {course.requirements.map((item) => (
                <li className="rounded-md bg-muted px-4 py-3" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>

      <aside className="hidden rounded-lg border border-border bg-card p-5 lg:sticky lg:top-16 lg:block">
        <CourseFacts course={course} primaryInstructor={primaryInstructor} />
        {enrollmentPanel}
      </aside>
    </div>
  );
}

function CourseFacts({
  course,
  primaryInstructor,
}: {
  course: PublicCourse;
  primaryInstructor?: string;
}) {
  return (
    <>
      <p className="text-sm font-semibold text-muted-foreground">Course summary</p>
      <p className="mt-2 text-4xl font-semibold">
        {formatCoursePrice(course.price)}
      </p>
      <dl className="mt-5 grid gap-4 text-sm">
        <DetailRow
          label="Duration"
          value={formatCourseDuration(course.durationInMinutes)}
        />
        <DetailRow label="Level" value={formatCourseLevel(course.level)} />
        <DetailRow label="Language" value={course.language ?? "Not specified"} />
        <DetailRow
          label="Instructor"
          value={primaryInstructor ?? "Not assigned"}
        />
        <DetailRow
          label="Certificate"
          value={course.certificateEnabled ? "Included" : "Not included"}
        />
      </dl>
    </>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-2xl font-semibold leading-tight">{title}</h2>;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
