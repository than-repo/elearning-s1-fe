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
