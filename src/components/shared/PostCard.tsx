"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Post } from "@/types/post";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { useToggleLike } from "@/hooks/post/useToggleLike";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { useRouter } from "next/navigation";
import { useToggleSave } from "@/hooks/post/useToggleSave";
import { useMemo, useCallback } from "react";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);
  const { data: userInfo } = useUserProfile();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const { mutate: toggleLikeMutation, isPending } = useToggleLike();
  const { mutate: toggleSaveMutation, isPending: savePending } =
    useToggleSave();
  const router = useRouter();

  const media = useMemo(
    () => [...(post.mediaItems || [])].sort((a, b) => a.order - b.order),
    [post.mediaItems]
  );
  const currentMedia = media[mediaIndex];

  const handlePrev = useCallback(
    () => setMediaIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1)),
    [media.length]
  );
  const handleNext = useCallback(
    () => setMediaIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1)),
    [media.length]
  );

  useEffect(() => {
    if (userInfo?.id) {
      setLiked(post.likedByUserIds?.includes(userInfo.id) || false);
      setSaved(post.savedByUserIds?.includes(userInfo.id) || false);
    }
  }, [userInfo?.id, post.likedByUserIds, post.savedByUserIds]);

  const handleToggleLike = useCallback(() => {
    if (!userInfo?.id) return;
    setLiked((prev) => !prev);
    toggleLikeMutation(post.id);
  }, [post.id, toggleLikeMutation, userInfo?.id]);

  const handleToggleSave = useCallback(() => {
    if (!userInfo?.id) return;
    setSaved((prev) => !prev);
    toggleSaveMutation(post.id);
  }, [post.id, toggleSaveMutation, userInfo?.id]);

  const handleOpenModal = useCallback(() => {
    router.push(`/p/${post.id}`);
  }, [post.id, router]);

  const handleUsernameClick = useCallback(() => {
    router.push(`/profile/${post.createdBy.userName}`);
  }, [post.createdBy.userName, router]);

  const likedByUser = useMemo(
    () => userInfo?.id && post.likedByUserIds?.includes(userInfo.id),
    [userInfo?.id, post.likedByUserIds]
  );
  const likeCount = post.likedByUserIds?.length || 0;
  const displayLikeCount =
    liked && !likedByUser
      ? likeCount + 1
      : !liked && likedByUser
      ? likeCount - 1
      : likeCount;

  return (
    <Card className="w-[500px] bg-black h-[750px] p-4 flex flex-col gap-2 border-none">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post.createdBy.avatar?.avatarUrl} />
        </Avatar>
        <span
          onClick={handleUsernameClick}
          className="font-medium text-sm hover:cursor-pointer hover:underline"
        >
          {post.createdBy.userName}
        </span>
        <div className="text-sm text-muted-foreground">
          <span>· {formatRelativeTime(post.createdAt)}</span>
        </div>
        <div className="ml-auto hover:cursor-pointer">
          <MoreHorizontal className="!h-5 !w-5" />
        </div>
      </div>

      {media.length > 0 && (
        <div
          onClick={handleOpenModal}
          className="relative w-full h-[600px] rounded-lg overflow-hidden border hover:cursor-pointer"
        >
          {currentMedia?.type === "Image" ? (
            <Image
              src={currentMedia.url}
              alt="media"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain"
              loading="lazy"
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
      )}

      <div className="flex gap-2 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleLike}
          disabled={isPending}
          className="hover:cursor-pointer"
        >
          <Heart
            className={`!w-6 !h-6 ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
        <Button
          onClick={handleOpenModal}
          variant="ghost"
          size="icon"
          className="hover:cursor-pointer"
        >
          <MessageCircle className="!w-6 !h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleSave}
          disabled={savePending}
          className="ml-auto hover:cursor-pointer"
        >
          <Bookmark
            className={`!w-6 !h-6 ${
              saved ? "fill-blue-500 text-blue-500" : ""
            }`}
          />
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        <span>{displayLikeCount} beğeni</span> ·{" "}
        <span>{post.comments?.length || 0} yorum</span>
      </div>

      <div className="text-sm break-words">
        {post.content ? (
          showFullContent || post.content.length <= 200 ? (
            <p>{post.content}</p>
          ) : (
            <>
              <p>{post.content.slice(0, 200)}...</p>
              <button
                className="text-blue-600 hover:underline text-xs mt-1 hover:cursor-pointer"
                onClick={() => setShowFullContent(true)}
              >
                devamını oku
              </button>
            </>
          )
        ) : (
          <p className="text-muted-foreground italic">İçerik bulunamadı.</p>
        )}
      </div>
    </Card>
  );
}
