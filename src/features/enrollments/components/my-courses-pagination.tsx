import Link from "next/link";

import type { PaginationMeta } from "@/features/courses/types/course";

type MyCoursesPaginationProps = {
  meta: PaginationMeta;
};

export function MyCoursesPagination({ meta }: MyCoursesPaginationProps) {
  if (meta.totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(meta.page, meta.totalPages);

  return (
    <nav
      aria-label="My courses pagination"
      className="flex flex-col items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row"
    >
      <p className="text-sm text-muted-foreground">
        Page {meta.page} of {meta.totalPages}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <PaginationLink
          disabled={!meta.hasPreviousPage}
          href={buildMyCoursesHref(meta.page - 1)}
          label="Previous"
        />
        <div className="hidden items-center gap-2 sm:flex">
          {pages.map((page) => (
            <Link
              aria-current={page === meta.page ? "page" : undefined}
              className={[
                "inline-flex size-9 items-center justify-center rounded-pill border text-sm",
                page === meta.page
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary hover:text-primary",
              ].join(" ")}
              href={buildMyCoursesHref(page)}
              key={page}
            >
              {page}
            </Link>
          ))}
        </div>
        <PaginationLink
          disabled={!meta.hasNextPage}
          href={buildMyCoursesHref(meta.page + 1)}
          label="Next"
        />
      </div>
    </nav>
  );
}

function PaginationLink({
  disabled,
  href,
  label,
}: {
  disabled: boolean;
  href: string;
  label: string;
}) {
  if (disabled) {
    return (
      <span className="inline-flex min-h-9 items-center justify-center rounded-pill border border-border px-4 text-sm text-muted-foreground opacity-60">
        {label}
      </span>
    );
  }

  return (
    <Link
      className="inline-flex min-h-9 items-center justify-center rounded-pill border border-border px-4 text-sm transition-colors hover:border-primary hover:text-primary"
      href={href}
    >
      {label}
    </Link>
  );
}

function buildMyCoursesHref(page: number) {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();

  return queryString ? `/my-courses?${queryString}` : "/my-courses";
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  const pages: number[] = [];

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return pages;
}
