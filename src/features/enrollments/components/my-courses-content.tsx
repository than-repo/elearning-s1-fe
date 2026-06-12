"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { ApiError } from "@/lib/api/client";

import { getMyEnrollments } from "../api/enrollment-api";
import type { PaginatedEnrollments } from "../types/enrollment";
import { MyCourseCard } from "./my-course-card";
import { MyCoursesPagination } from "./my-courses-pagination";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export function MyCoursesContent() {
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
        {Array.from({ length: 3 }).map((_, index) => (
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
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-pill border border-primary bg-primary px-6 text-base font-normal text-primary-foreground"
          href="/courses"
        >
          Browse courses
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {result.data.map((enrollment) => (
          <MyCourseCard enrollment={enrollment} key={enrollment.id} />
        ))}
      </div>
      <MyCoursesPagination meta={result.meta} query={query} />
    </div>
  );
}

function parseMyCoursesQuery(searchParams: URLSearchParams) {
  return {
    limit: clampNumber(searchParams.get("limit"), DEFAULT_LIMIT, 1, MAX_LIMIT),
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
