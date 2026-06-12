import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PublicNavbar } from "@/components/layout/public-navbar/public-navbar";
import { getPublicCourseBySlug } from "@/features/courses/api/course-api";
import { PaymentCheckout } from "@/features/enrollments/components/payment-checkout";
import { ApiError } from "@/lib/api/client";

type CoursePaymentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const navLinks = [{ href: "/courses", label: "Courses" }];

export const metadata: Metadata = {
  title: "Payment | E-Learning System",
  description: "Confirm simulated payment and enroll in a course.",
};

export default async function CoursePaymentPage({
  params,
}: CoursePaymentPageProps) {
  const { slug } = await params;
  const course = await getCourseOrNotFound(slug);

  return (
    <main className="min-h-screen bg-muted text-foreground">
      <PublicNavbar brandLabel="E-Learning System" links={navLinks} />
      <section className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <PaymentCheckout course={course} />
      </section>
    </main>
  );
}

async function getCourseOrNotFound(slug: string) {
  try {
    return await getPublicCourseBySlug(slug);
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      notFound();
    }

    throw error;
  }
}
