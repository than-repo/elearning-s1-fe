import type { PublicNavLink } from "@/components/layout/public-navbar/nav-link";

export type HomeAction = {
  href: string;
  label: string;
};

export type HomeHeroImage = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

export type HomeStat = {
  label: string;
  value: string;
};

export type FeaturedCourse = {
  description: string;
  duration: string;
  level: string;
  title: string;
};

export type RoleCard = {
  description: string;
  title: string;
};

export const brandLabel = "E-Learning System";

export const navLinks: PublicNavLink[] = [
  { href: "/courses", label: "Courses" },
];

export const heroContent = {
  eyebrow: "Online learning, pared back",
  title: "One calm place to learn, teach, and manage courses.",
  description:
    "A focused MVP experience for learners, instructors, and admins, designed around clear courses, steady progress, and simple controls.",
  primaryAction: { href: "/courses", label: "Browse courses" },
  secondaryAction: { href: "/login", label: "Sign in" },
  image: {
    alt: "Premium learning workspace shown on a laptop and tablet",
    height: 1024,
    src: "/images/home-learning-workspace.png",
    width: 1536,
  },
};

export const benefits = [
  "Structured courses",
  "Progress-ready",
  "Instructor tools",
  "Admin review",
];

export const stats: HomeStat[] = [
  { label: "Course paths for the catalog", value: "120+" },
  { label: "Learner activity prepared", value: "8k+" },
  { label: "Roles shaped for MVP workflows", value: "3" },
];

export const featuredCourses: FeaturedCourse[] = [
  {
    title: "Foundations of Web Development",
    level: "Beginner",
    duration: "6 weeks",
    description:
      "A clean path through HTML, CSS, and JavaScript for new learners.",
  },
  {
    title: "Backend APIs with NestJS",
    level: "Intermediate",
    duration: "8 weeks",
    description:
      "TypeScript API design with validation, service boundaries, and secure routes.",
  },
  {
    title: "Productive Learning Habits",
    level: "All levels",
    duration: "3 weeks",
    description:
      "A simple system for study rhythm, progress, and deliberate practice.",
  },
];

export const roleCards: RoleCard[] = [
  {
    title: "Learners",
    description:
      "Find courses, follow lessons, and keep learning progress easy to read.",
  },
  {
    title: "Instructors",
    description:
      "Prepare course content, organize sections, and keep teaching workflows focused.",
  },
  {
    title: "Admins and reviewers",
    description:
      "Review courses, manage categories, and keep platform operations controlled.",
  },
];

export const finalCta = {
  title: "Start with the catalog. Grow into the full platform.",
  description:
    "The HomePage stays static for now, but it sets the visual foundation for the course, auth, and dashboard flows that come next.",
  primaryAction: { href: "/register", label: "Register now" },
  secondaryAction: { href: "/courses", label: "Browse courses" },
};
