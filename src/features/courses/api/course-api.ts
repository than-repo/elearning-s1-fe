import { apiRequest } from "@/lib/api/client";

import type {
  CategoryTreeNode,
  PaginatedCourses,
  PublicCourse,
  PublicCourseQuery,
} from "../types/course";
import { buildPublicCourseQueryString } from "../utils/course-data";

export function getPublicCourses(query?: PublicCourseQuery) {
  return apiRequest<PaginatedCourses>(
    `/courses/public${buildPublicCourseQueryString(query)}`,
    {
      method: "GET",
    },
  );
}

export function getPublicCourseBySlug(slug: string) {
  return apiRequest<PublicCourse>(
    `/courses/public/${encodeURIComponent(slug)}`,
    {
      method: "GET",
    },
  );
}

export function getPublicCategoryTree() {
  return apiRequest<CategoryTreeNode[]>("/courses/public/category-tree", {
    method: "GET",
  });
}
