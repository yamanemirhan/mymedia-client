"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { Heart, MessageCircle, MoreHorizontal, Bookmark } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { useToggleLike } from "@/hooks/post/useToggleLike";
import { useGetCommentsByPostId } from "@/hooks/message/useGetCommentsByPostId";
import { useCreateComment } from "@/hooks/message/useCreateComment";
import CommentList from "./CommentList";
import { Post } from "@/types/post";
import { useToast } from "@/hooks/toast/useToast";
import { useToggleSave } from "@/hooks/post/useToggleSave";
import { useRouter } from "next/navigation";

export default function PostDetails({ post }: { post: Post }) {
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const { data: userInfo } = useUserProfile();
  const { mutate: toggleLikeMutation, isPending } = useToggleLike();
  const { mutate: toggleSaveMutation, isPending: savePending } =
    useToggleSave();

  const { data: comments, isLoading: isCommentLoading } =
    useGetCommentsByPostId(post?.id);
  const { mutate: createComment, isPending: isCommentSending } =
    useCreateComment();
  const { errorToast } = useToast();

  useEffect(() => {
    if (userInfo?.id) {
      setLiked(post.likedByUserIds?.includes(userInfo.id) || false);
      setSaved(post.savedByUserIds?.includes(userInfo.id) || false);
    }
  }, [userInfo?.id, post.likedByUserIds, post.savedByUserIds]);

  const handleToggleLike = () => {
    if (!userInfo?.id) return;
    setLiked((prev) => !prev);
    if (post?.id) {
      toggleLikeMutation(post.id);
    }
  };

  const handleToggleSave = useCallback(() => {
    if (!userInfo?.id) return;
    setSaved((prev) => !prev);
    toggleSaveMutation(post.id);
  }, [post.id, toggleSaveMutation, userInfo?.id]);

  const likedByUser =
    userInfo?.id && post?.likedByUserIds?.includes(userInfo.id);
  const likeCount = post?.likedByUserIds?.length || 0;
  const displayLikeCount =
    liked && !likedByUser
      ? likeCount + 1
      : !liked && likedByUser
      ? likeCount - 1
      : likeCount;

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    if (commentText.length > 200) {
      errorToast("Yorum 200 karakterden fazla olamaz.");
      return;
    }
    if (commentText.length < 3) {
      errorToast("Yorum 3 karakterden az olamaz.");
      return;
    }

    createComment(
      { postId: post.id, text: commentText },
      {
        onSuccess: () => {
          setCommentText("");
        },
      }
    );
  };

  const handleUsernameClick = useCallback(() => {
    router.push(`/profile/${post.createdBy.userName}`);
  }, [post.createdBy.userName, router]);

  return (
    <div className="w-full md:w-1/2 h-full flex flex-col p-4 mr-20">
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

      <div className="border-t border-b my-2 px-4 py-2">
        <p className="mb-4">{post.content}</p>
      </div>

      <ScrollArea className="flex-1 px-4 py-2 overflow-y-auto">
        <CommentList
          comments={comments || []}
          postId={post.id}
          isLoading={isCommentLoading}
        />
      </ScrollArea>

      <div className="border-t">
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleLike}
            disabled={isPending}
            className="hover:cursor-pointer"
          >
            <Heart
              className={`!w-6 !h-6 ${
                liked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button variant="ghost" size="icon" className="hover:cursor-pointer">
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

        <div className="text-sm text-muted-foreground border-b mb-2 py-3">
          <span>{displayLikeCount} beğeni</span> ·{" "}
          <span>{post.comments.length || 0} yorum</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="w-full">
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Yorum ekle..."
          />
        </div>
        <Button
          size={"sm"}
          onClick={handleSendComment}
          disabled={isCommentSending}
          className="hover:cursor-pointer"
        >
          {/* {isCommentSending ? "Gönderiliyor..." : "Gönder"} */}
          Gönder
        </Button>
      </div>
    </div>
  );
}
