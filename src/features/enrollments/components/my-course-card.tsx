import Image from "next/image";
import Link from "next/link";

import { canUseNextImage } from "@/features/courses/utils/course-data";

import type { Enrollment, EnrollmentCourseSummary } from "../types/enrollment";

type MyCourseCardProps = {
  enrollment: Enrollment;
};

export function MyCourseCard({ enrollment }: MyCourseCardProps) {
  const course = enrollment.course;

  if (!course) {
    return null;
  }

  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-4">
      <EnrollmentCourseImage course={course} />

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-pill bg-muted px-3 py-1 text-xs text-ink-muted">
          {formatEnrollmentStatus(enrollment.status)}
        </span>
        {enrollment.payment ? (
          <span className="rounded-pill border border-border px-3 py-1 text-xs text-muted-foreground">
            {enrollment.payment.status}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h2 className="text-xl font-semibold leading-tight">{course.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {course.shortDescription}
        </p>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">
              {Math.round(enrollment.progressPercentage)}%
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-pill bg-muted">
            <div
              className="h-full rounded-pill bg-primary"
              style={{
                width: `${Math.min(Math.max(enrollment.progressPercentage, 0), 100)}%`,
              }}
            />
          </div>
        </div>

        <dl className="mt-5 grid gap-2 text-sm text-muted-foreground">
          <CardRow
            label="Enrolled"
            value={formatDate(enrollment.enrolledAt ?? enrollment.createdAt)}
          />
          <CardRow label="Level" value={course.level} />
        </dl>

        <Link
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-pill border border-primary bg-primary px-6 text-base font-normal text-primary-foreground transition-transform active:scale-95"
          href={`/courses/${course.slug}/learn`}
        >
          Continue learning
        </Link>
      </div>
    </article>
  );
}

function EnrollmentCourseImage({ course }: { course: EnrollmentCourseSummary }) {
  const imageSource = getEnrollmentCourseImageSource(course);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-muted">
      {canUseNextImage(imageSource) ? (
        <Image
          alt={course.title}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
          src={imageSource}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={course.title}
          className="h-full w-full object-cover"
          loading="lazy"
          src={imageSource}
        />
      )}
    </div>
  );
}

function getEnrollmentCourseImageSource(course: EnrollmentCourseSummary) {
  if (course.thumbnailUrl) {
    return course.thumbnailUrl;
  }

  const searchableText = `${course.title} ${course.shortDescription}`.toLowerCase();

  if (
    searchableText.includes("nestjs") ||
    searchableText.includes("backend") ||
    searchableText.includes("api")
  ) {
    return "/images/nestjs.png";
  }

  if (
    searchableText.includes("nextjs") ||
    searchableText.includes("frontend") ||
    searchableText.includes("react")
  ) {
    return "/images/nextjs.png";
  }

  return "/images/AI.png";
}

function CardRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt>{label}</dt>
      <dd className="text-right text-foreground">{value}</dd>
    </div>
  );
}

function formatEnrollmentStatus(status: Enrollment["status"]) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
