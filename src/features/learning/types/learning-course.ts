export type LearningMediaType =
  | "VIDEO"
  | "DOCUMENT"
  | "IMAGE"
  | "AUDIO"
  | "OTHER";

export type LearningFile = {
  id: string;
  type: LearningMediaType;
  url: string;
};

export type LearningLesson = {
  description?: string | null;
  files: LearningFile[];
  id: string;
  lessonIndex: number;
  title: string;
};

export type LearningSection = {
  description?: string | null;
  id: string;
  lessons: LearningLesson[];
  sectionIndex: number;
  title: string;
};

export type CourseLearningResponse = {
  id: string;
  sections: LearningSection[];
  shortDescription: string;
  slug: string;
  thumbnailUrl?: string | null;
  title: string;
};

export type LearningAssessmentType = "QUIZ" | "PROJECT";

export type LearningAssessmentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type LearningAssessment = {
  id: string;
  title: string;
  description?: string | null;
  type: LearningAssessmentType;

  order: number;
  totalPoints: number;
  passingScore?: number | null;

  maxAttempts?: number | null;
  timeLimitMinutes?: number | null;

  availableFrom?: string | null;
  availableUntil?: string | null;
};

export type LearningCourse = {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  thumbnailUrl?: string | null;

  sections: LearningSection[];

  /**
   * Course-level assessments.
   * These do not belong to a section or lesson.
   */
  assessments: LearningAssessment[];
};
