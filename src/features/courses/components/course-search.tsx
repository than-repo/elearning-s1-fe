"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

type CourseSearchProps = {
  initialValue?: string | null;
};

export function CourseSearch({ initialValue = "" }: CourseSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialValue ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    const nextSearch = search.trim();

    if (nextSearch) {
      params.set("search", nextSearch);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="course-search">
        Search courses
      </label>
      <input
        className="min-h-11 flex-1 rounded-md border border-border bg-background px-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-focus/20"
        id="course-search"
        name="search"
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search courses"
        type="search"
        value={search}
      />
      <button
        className="inline-flex min-h-11 items-center justify-center rounded-pill border border-primary bg-primary px-6 text-base font-normal text-primary-foreground transition-transform active:scale-95"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
