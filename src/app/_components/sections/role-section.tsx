import { SectionHeader } from "@/components/ui/section-header";

import type { RoleCard } from "../home-content";

type RoleSectionProps = {
  roles: RoleCard[];
};

export function RoleSection({ roles }: RoleSectionProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <SectionHeader
          description="Each role gets a clear surface now, while real permissions and session data stay out of this static pass."
          eyebrow="Built for every role"
          title="A simple structure for the full learning workflow."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {roles.map((role) => (
            <article
              key={role.title}
              className="rounded-lg border border-border bg-card p-6"
            >
              <h3 className="text-2xl font-semibold leading-tight">
                {role.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {role.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
