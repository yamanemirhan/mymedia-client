"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { useCreateComment } from "@/hooks/message/useCreateComment";
import { Comment } from "@/types/comment";
import { Heart } from "lucide-react";

export default function CommentItem({
  comment,
  postId,
  depth = 0,
}: {
  comment: Comment;
  postId: string;
  depth?: number;
}) {
  const [replyInputOpenId, setReplyInputOpenId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const { mutate: createComment, isPending: isCommentSending } =
    useCreateComment();

  const handleSendReply = (parentCommentId: string) => {
    if (!replyText.trim()) return;

    createComment(
      { postId, text: replyText, parentCommentId },
      {
        onSuccess: () => {
          setReplyInputOpenId(null);
          setReplyText("");
        },
      }
    );
  };

  return (
    <div className="ml-0 pl-0">
      <div className="flex gap-2 items-start">
        <Avatar className="w-6 h-6">
          <AvatarImage src={comment.user.avatar?.avatarUrl} />
        </Avatar>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex gap-2">
            <span className="font-medium text-sm">
              {comment.user.username}:
            </span>
            <span className="text-sm">{comment.text}</span>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-4">
            <span>{formatRelativeTime(comment.createdAt)}</span>
            {/* <span>156 beğeni</span> */}
            {/* <span
              className="cursor-pointer"
              onClick={() => setReplyInputOpenId(comment.id)}
            >
              Yanıtla
            </span> */}
          </div>

          {/* {replyInputOpenId === comment.id && (
            <div className="mt-1 flex flex-col gap-2">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Yanıt yaz..."
                rows={2}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleSendReply(comment.id)}
                  disabled={isCommentSending}
                >
                  Gönder
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setReplyInputOpenId(null);
                    setReplyText("");
                  }}
                >
                  Vazgeç
                </Button>
              </div>
            </div>
          )} */}

          {/* {(comment.replies ?? []).length > 0 && (
            <div className="mt-2 space-y-2 w-full">
              {(comment.replies ?? []).map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  depth={depth + 1}
                />
              ))}
            </div>
          )} */}
        </div>
        <div className="ml-auto">
          <Button variant="ghost" size="icon">
            {/* todo */}
            <Heart
              className={`!w-4 !h-4 ${
                comment.id == "123" ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
