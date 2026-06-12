import { apiRequest } from "@/lib/api/client";

import type {
  Enrollment,
  EnrollmentStatusResult,
  MyEnrollmentsQuery,
  PaginatedEnrollments,
} from "../types/enrollment";

export function enrollInCourse(courseId: string, accessToken: string) {
  return apiRequest<Enrollment>(
    `/enrollments/courses/${encodeURIComponent(courseId)}`,
    {
      accessToken,
      method: "POST",
    },
  );
}

export function getCourseEnrollmentStatus(
  courseId: string,
  accessToken: string,
) {
  return apiRequest<EnrollmentStatusResult>(
    `/enrollments/courses/${encodeURIComponent(courseId)}/status`,
    {
      accessToken,
      method: "GET",
    },
  );
}

export function getMyEnrollments(
  query: MyEnrollmentsQuery,
  accessToken: string,
) {
  return apiRequest<PaginatedEnrollments>(
    `/enrollments/me${buildMyEnrollmentsQueryString(query)}`,
    {
      accessToken,
      method: "GET",
    },
  );
}

function buildMyEnrollmentsQueryString(query: MyEnrollmentsQuery) {
  const params = new URLSearchParams();

  if (query.page !== undefined && query.page !== null) {
    params.set("page", String(query.page));
  }

  if (query.limit !== undefined && query.limit !== null) {
    params.set("limit", String(query.limit));
  }

  const queryString = params.toString();

  return queryString ? `?${queryString}` : "";
}
