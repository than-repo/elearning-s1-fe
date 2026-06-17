import type { CourseLevel, PaginationMeta } from "@/features/courses/types/course";

export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "CANCELLED" | "EXPIRED";

export type PaymentMethod = "VNPAY" | "SIMULATION";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "EXPIRED";

export type EnrollmentCourseSummary = {
  id: string;
  level: CourseLevel;
  price?: number | null;
  shortDescription: string;
  slug: string;
  thumbnailUrl?: string | null;
  title: string;
};

export type PaymentSummary = {
  amount: number;
  createdAt: string;
  currency: string;
  id: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
};

export type Enrollment = {
  completedAt?: string | null;
  course?: EnrollmentCourseSummary;
  courseId: string;
  createdAt: string;
  enrolledAt?: string | null;
  id: string;
  payment?: PaymentSummary | null;
  progressPercentage: number;
  status: EnrollmentStatus;
};

export type EnrollmentStatusResult = {
  enrolled: boolean;
  enrollment?: Enrollment | null;
};

export type MyEnrollmentsQuery = {
  limit?: number | null;
  page?: number | null;
};

export type PaginatedEnrollments = {
  data: Enrollment[];
  meta: PaginationMeta;
};
