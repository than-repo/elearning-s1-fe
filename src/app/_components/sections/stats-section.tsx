import type { HomeStat } from "../home-content";

type StatsSectionProps = {
  stats: HomeStat[];
};

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-muted">
      <div className="mx-auto grid w-full max-w-[1440px] gap-4 px-5 py-16 sm:grid-cols-3 sm:px-8 lg:px-12 lg:py-20">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-card p-6 text-center"
          >
            <p className="text-4xl font-semibold leading-none text-primary">
              {stat.value}
            </p>
            <p className="mt-3 text-sm font-normal text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
