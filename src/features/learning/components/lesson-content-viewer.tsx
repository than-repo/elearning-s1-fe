import type { LearningFile, LearningLesson } from "../types/learning-course";
import { getYoutubeEmbedUrl } from "../utils/media-url";
import {
  mediaTypeLabels,
  mediaTypeMarks,
  pickPrimaryFile,
} from "../utils/learning-course";

type LessonContentViewerProps = {
  lesson: LearningLesson;
  sectionTitle: string;
};

export function LessonContentViewer({
  lesson,
  sectionTitle,
}: LessonContentViewerProps) {
  const primaryFile = pickPrimaryFile(lesson.files);

  return (
    <section className="overflow-hidden rounded-lg border-2 border-foreground/80 bg-white shadow-[5px_5px_0_#1d1d1f]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-foreground/80 bg-[#dff6ee] px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{sectionTitle}</p>
          <p className="mt-1 text-xs text-ink-muted">
            {primaryFile ? mediaTypeLabels[primaryFile.type] : "No content"}
          </p>
        </div>
        {primaryFile ? (
          <a
            className="inline-flex min-h-10 items-center justify-center rounded-pill border-2 border-foreground/80 bg-white px-4 text-sm font-semibold shadow-[2px_2px_0_#1d1d1f] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            href={primaryFile.url}
            rel="noreferrer"
            target="_blank"
          >
            Open source
          </a>
        ) : null}
      </div>

      <div className="bg-[#1f2937] p-3 sm:p-4">
        <div className="grid min-h-[280px] place-items-center overflow-hidden rounded-md border-2 border-white/80 bg-[#111827] text-white sm:min-h-[420px]">
          <PrimaryFileViewer file={primaryFile} lessonTitle={lesson.title} />
        </div>
      </div>
    </section>
  );
}

function PrimaryFileViewer({
  file,
  lessonTitle,
}: {
  file: LearningFile | null;
  lessonTitle: string;
}) {
  if (!file) {
    return (
      <EmptyViewer
        message="This lesson does not have learning content yet."
        title={lessonTitle}
      />
    );
  }

  if (file.type === "VIDEO") {
    const youtubeEmbedUrl = getYoutubeEmbedUrl(file.url);

    if (youtubeEmbedUrl) {
      return (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full min-h-[280px] w-full sm:min-h-[420px]"
          referrerPolicy="strict-origin-when-cross-origin"
          src={youtubeEmbedUrl}
          title={lessonTitle}
        />
      );
    }

    return (
      <video
        className="h-full max-h-[70vh] w-full bg-black"
        controls
        preload="metadata"
        src={file.url}
      >
        Your browser does not support the video element.
      </video>
    );
  }

  if (file.type === "AUDIO") {
    return (
      <div className="w-full max-w-2xl px-4 py-10 text-center">
        <MediaMark file={file} />
        <h2 className="mt-4 break-words text-2xl font-semibold leading-tight">
          {lessonTitle}
        </h2>
        <audio className="mt-6 w-full" controls src={file.url} />
      </div>
    );
  }

  if (file.type === "IMAGE") {
    return (
      <div className="w-full p-3">
        {/* Learning media may come from private or unconfigured origins. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={lessonTitle}
          className="mx-auto max-h-[70vh] w-auto rounded-md object-contain"
          src={file.url}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl px-4 py-10 text-center">
      <MediaMark file={file} />
      <h2 className="mt-4 break-words text-2xl font-semibold leading-tight">
        {lessonTitle}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/70">
        Open this {mediaTypeLabels[file.type].toLowerCase()} in a new tab to
        continue the lesson.
      </p>
      <a
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-pill border-2 border-white bg-white px-5 text-sm font-semibold text-foreground transition-transform active:scale-95"
        href={file.url}
        rel="noreferrer"
        target="_blank"
      >
        Open resource
      </a>
    </div>
  );
}

function EmptyViewer({ message, title }: { message: string; title: string }) {
  return (
    <div className="w-full max-w-xl px-4 py-10 text-center">
      <div className="mx-auto grid size-20 place-items-center rounded-full border-2 border-white bg-[#ffe8a3] text-2xl font-semibold text-foreground shadow-[4px_4px_0_#ffffff]">
        L
      </div>
      <h2 className="mt-4 break-words text-2xl font-semibold leading-tight">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/70">
        {message}
      </p>
    </div>
  );
}

function MediaMark({ file }: { file: LearningFile }) {
  return (
    <div className="mx-auto grid size-20 place-items-center rounded-full border-2 border-white bg-[#ffe8a3] text-2xl font-semibold text-foreground shadow-[4px_4px_0_#ffffff]">
      {mediaTypeMarks[file.type]}
    </div>
  );
}
