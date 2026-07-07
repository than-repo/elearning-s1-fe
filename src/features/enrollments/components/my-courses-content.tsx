"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/features/auth/hooks/use-auth";
import type {
  CourseLevel,
  PublicCourse,
} from "@/features/courses/types/course";
import { ApiError } from "@/lib/api/client";

import { getMyEnrollments } from "../api/enrollment-api";
import type { PaginatedEnrollments } from "../types/enrollment";
import { MyCourseCard } from "./my-course-card";
import { MyCoursesPagination } from "./my-courses-pagination";

const MY_COURSES_PAGE_SIZE = 9;
const MIN_SEARCH_LENGTH = 3;

// Do not include ALL_LEVELS here.
// The empty select option already means "All levels".
const COURSE_LEVELS: CourseLevel[] = ["BEGINNER", "INTERMEDIATE", "ADVANCE"];

export function MyCoursesContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<CourseLevel | undefined>(
    undefined,
  );

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { accessToken, status } = useAuth();

  const [result, setResult] = useState<PaginatedEnrollments | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requestedQuery, setRequestedQuery] = useState<string | null>(null);

  const query = useMemo(
    () => parseMyCoursesQuery(searchParams),
    [searchParams],
  );

  const queryKey = `${query.page}:${query.limit}`;
  const isLoading = status !== "authenticated" || requestedQuery !== queryKey;

  const filteredEnrollments = useMemo(() => {
    if (!result) {
      return [];
    }

    const keyword = normalizeSearch(searchTerm);
    const shouldApplySearch = keyword.length >= MIN_SEARCH_LENGTH;

    return result.data.filter((enrollment) => {
      const course = getEnrollmentCourse(enrollment);

      if (!course) {
        return false;
      }

      const searchText = getCourseSearchText(course);
      const courseLevel = getCourseLevel(course);

      const matchesSearch = !shouldApplySearch || searchText.includes(keyword);

      const matchesLevel =
        levelFilter === undefined || courseLevel === levelFilter;

      return matchesSearch && matchesLevel;
    });
  }, [result, searchTerm, levelFilter]);

  useEffect(() => {
    if (status !== "authenticated" || !accessToken) {
      return;
    }

    let isMounted = true;

    getMyEnrollments(query, accessToken)
      .then((nextResult) => {
        if (isMounted) {
          setResult(nextResult);
          setError(null);
        }
      })
      .catch((loadError) => {
        if (!isMounted) {
          return;
        }

        if (loadError instanceof ApiError && loadError.statusCode === 401) {
          router.replace(`/login?next=${encodeURIComponent(pathname)}`);
          return;
        }

        setError("Unable to load your enrolled courses.");
      })
      .finally(() => {
        if (isMounted) {
          setRequestedQuery(queryKey);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [accessToken, pathname, query, queryKey, router, status]);

  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="min-h-[320px] rounded-lg border border-border bg-card p-4"
            key={index}
          >
            <div className="aspect-[16/9] rounded-md bg-muted" />
            <div className="mt-5 h-5 w-2/3 rounded-md bg-muted" />
            <div className="mt-3 h-4 w-full rounded-md bg-muted" />
            <div className="mt-2 h-4 w-5/6 rounded-md bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-border bg-card px-5 py-14 text-center">
        <p className="text-lg font-semibold">Courses unavailable</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          {error}
        </p>
      </div>
    );
  }

  if (!result || result.data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card px-5 py-14 text-center">
        <p className="text-lg font-semibold">No enrolled courses yet</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Browse the catalog and enroll in a course to see it here.
        </p>
        <Link
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-primary bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-focus"
          href="/courses"
        >
          Browse courses
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <label className="text-sm font-semibold">
            Search courses
            <input
              className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Minimum 3 characters..."
              type="search"
              value={searchTerm}
            />
            {searchTerm.trim().length > 0 &&
              searchTerm.trim().length < MIN_SEARCH_LENGTH && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Type at least {MIN_SEARCH_LENGTH} characters to search.
                </p>
              )}
          </label>

          <label className="text-sm font-semibold">
            Level
            <select
              className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
              onChange={(event) => {
                const value = event.target.value;

                setLevelFilter(
                  value === "" ? undefined : (value as CourseLevel),
                );
              }}
              value={levelFilter ?? ""}
            >
              <option value="">All levels</option>
              {COURSE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {formatCourseLevel(level)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="min-h-10 rounded-md border border-border px-4 text-sm font-semibold transition-colors hover:bg-muted"
            onClick={() => {
              setSearchTerm("");
              setLevelFilter(undefined);
            }}
            type="button"
          >
            Reset filters
          </button>
        </div>
      </div>

      {filteredEnrollments.length === 0 ? (
        <div className="rounded-lg border border-border bg-card px-5 py-14 text-center">
          <p className="text-lg font-semibold">No courses match your filters</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Try changing the search keyword or level.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEnrollments.map((enrollment) => (
            <MyCourseCard enrollment={enrollment} key={enrollment.id} />
          ))}
        </div>
      )}

      <MyCoursesPagination meta={result.meta} />
    </div>
  );
}

function parseMyCoursesQuery(searchParams: URLSearchParams) {
  return {
    limit: MY_COURSES_PAGE_SIZE,
    page: clampNumber(searchParams.get("page"), 1, 1),
  };
}

function clampNumber(
  value: string | null,
  fallback: number,
  min: number,
  max = Number.MAX_SAFE_INTEGER,
) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(Math.trunc(parsed), min), max);
}

type EnrollmentItem = PaginatedEnrollments["data"][number];

function getEnrollmentCourse(enrollment: EnrollmentItem): PublicCourse | null {
  return (
    (
      enrollment as EnrollmentItem & {
        course?: PublicCourse | null;
      }
    ).course ?? null
  );
}

function normalizeSearch(value: string) {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getCourseSearchText(course: PublicCourse) {
  return normalizeSearch(
    [
      course.title,
      course.shortDescription,
      course.description,
      course.level,
      ...(course.categories?.map((category) => category.name) ?? []),
      ...(course.instructors?.map((instructor) => instructor.fullName) ?? []),
      ...(course.requirements ?? []),
      ...(course.whatYouWillLearn ?? []),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function getCourseLevel(course: PublicCourse): CourseLevel | undefined {
  const level = (
    course as PublicCourse & {
      level?: CourseLevel | string | null;
    }
  ).level;

  if (
    level === "BEGINNER" ||
    level === "INTERMEDIATE" ||
    level === "ADVANCE" ||
    level === "ALL_LEVELS"
  ) {
    return level;
  }

  return undefined;
}

function formatCourseLevel(level: CourseLevel) {
  switch (level) {
    case "BEGINNER":
      return "Beginner";
    case "INTERMEDIATE":
      return "Intermediate";
    case "ADVANCE":
      return "Advanced";
    case "ALL_LEVELS":
      return "All levels";
    default:
      return level;
  }
}
