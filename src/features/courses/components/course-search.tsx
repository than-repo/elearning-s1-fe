"use client";

import { useState } from "react";

import { COURSE_CATALOG_CONTROLS_FORM_ID } from "./course-filters";

type CourseSearchProps = {
  initialValue?: string | null;
};

export function CourseSearch({ initialValue = "" }: CourseSearchProps) {
  const [search, setSearch] = useState(initialValue ?? "");

  return (
    <div className="grid gap-2">
      <label className="sr-only" htmlFor="course-search">
        Search courses
      </label>
      <input
        className="min-h-11 flex-1 rounded-md border border-border bg-background px-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-focus/20"
        form={COURSE_CATALOG_CONTROLS_FORM_ID}
        id="course-search"
        name="search"
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search courses"
        type="search"
        value={search}
      />
      <p className="text-sm text-muted-foreground">
        Search text is applied together with filters.
      </p>
    </div>
  );
}
