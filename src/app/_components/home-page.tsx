import { PublicNavbar } from "@/components/layout/public-navbar/public-navbar";

import {
  benefits,
  brandLabel,
  featuredCourses,
  finalCta,
  heroContent,
  navLinks,
  roleCards,
  stats,
} from "./home-content";
import { FeaturedCoursesSection } from "./sections/featured-courses-section";
import { FinalCtaSection } from "./sections/final-cta-section";
import { HeroSection } from "./sections/hero-section";
import { RoleSection } from "./sections/role-section";
import { StatsSection } from "./sections/stats-section";

export function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PublicNavbar brandLabel={brandLabel} links={navLinks} />
      <HeroSection
        benefits={benefits}
        description={heroContent.description}
        eyebrow={heroContent.eyebrow}
        image={heroContent.image}
        primaryAction={heroContent.primaryAction}
        secondaryAction={heroContent.secondaryAction}
        title={heroContent.title}
      />
      <StatsSection stats={stats} />
      <FeaturedCoursesSection courses={featuredCourses} />
      <RoleSection roles={roleCards} />
      <FinalCtaSection
        description={finalCta.description}
        primaryAction={finalCta.primaryAction}
        secondaryAction={finalCta.secondaryAction}
        title={finalCta.title}
      />
    </main>
  );
}
