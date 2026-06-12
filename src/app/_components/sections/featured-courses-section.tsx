import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeader } from "@/components/ui/section-header";

import type { FeaturedCourse } from "../home-content";

type FeaturedCoursesSectionProps = {
  courses: FeaturedCourse[];
};

export function FeaturedCoursesSection({
  courses,
}: FeaturedCoursesSectionProps) {
  return (
    <section className="bg-surface-dark text-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <SectionHeader
          action={
            <ButtonLink href="/courses" size="sm" variant="ghostOnDark">
              View all courses
            </ButtonLink>
          }
          className="mb-10"
          description="Static previews for now, ready to connect to the course catalog later."
          eyebrow="Featured courses"
          title="Practical paths, presented with less noise."
          tone="dark"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.title}
              className="flex min-h-72 flex-col rounded-lg border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-8 flex items-center justify-between gap-3">
                <Badge variant="dark">{course.level}</Badge>
                <span className="text-sm font-normal text-white/60">
                  {course.duration}
                </span>
              </div>
              <h3 className="text-2xl font-semibold leading-tight text-white">
                {course.title}
              </h3>
              <p className="mt-4 flex-1 text-base leading-7 text-white/70">
                {course.description}
              </p>
              <ButtonLink
                className="mt-7 justify-start px-0"
                href="/courses"
                size="sm"
                variant="ghostOnDark"
              >
                Explore course
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
