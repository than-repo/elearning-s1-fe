import { apiRequest } from "@/lib/api/client";

import type { CourseLearningResponse } from "../types/learning-course";

export function getCourseLearning(courseId: string, accessToken: string) {
  return apiRequest<CourseLearningResponse>(
    `/learning/courses/${encodeURIComponent(courseId)}/detail-learning`,
    {
      accessToken,
      method: "GET",
    },
  );
}
