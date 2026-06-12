type CoursesHeaderProps = {
  total: number;
};

export function CoursesHeader({ total }: CoursesHeaderProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <p className="text-sm font-semibold text-primary">Course catalog</p>
        <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
              Find the next course that fits your learning path.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Search published courses, filter by category and level, and keep
              the catalog URL ready to share.
            </p>
          </div>
          <p className="rounded-pill border border-border bg-surface-pearl px-5 py-2 text-sm text-ink-muted">
            {total} {total === 1 ? "course" : "courses"}
          </p>
        </div>
      </div>
    </section>
  );
}
