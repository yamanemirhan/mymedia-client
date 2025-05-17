"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MediaItem {
  url: string;
  type: "Image" | "Video";
  order: number;
}

interface Post {
  mediaItems?: MediaItem[];
}

export default function PostMediaViewer({ post }: { post: Post }) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const media = [...(post?.mediaItems || [])].sort((a, b) => a.order - b.order);
  const currentMedia = media[mediaIndex];

  const handleNext = () =>
    setMediaIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  const handlePrev = () =>
    setMediaIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));

  if (media.length === 0) return null;

  return (
    <div className="md:w-1/2 h-full relative w-full rounded-lg overflow-hidden hover:cursor-pointer">
      {currentMedia?.type === "Image" ? (
        <Image
          src={currentMedia.url}
          alt="media"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain"
        />
      ) : (
        <video
          src={currentMedia.url}
          className="w-full h-full object-contain"
          controls
        />
      )}

      {media.length > 1 && (
        <>
          <Button
            variant="default"
            size="icon"
            className="absolute top-1/2 left-1 -translate-y-1/2 bg-white/60 hover:cursor-pointer rounded-full w-6 h-6"
            onClick={handlePrev}
          >
            <ChevronLeft className="!w-5 !h-5 text-black" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="absolute top-1/2 right-1 -translate-y-1/2 bg-white/60 hover:cursor-pointer rounded-full w-6 h-6"
            onClick={handleNext}
          >
            <ChevronRight className="!w-5 !h-5 text-black" />
          </Button>
        </>
      )}
    </div>
  );
}
