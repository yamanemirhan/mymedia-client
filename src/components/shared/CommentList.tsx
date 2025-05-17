import { Skeleton } from "@/components/ui/skeleton";
import { Comment } from "@/types/comment";
import CommentItem from "./CommentItem";

export default function CommentList({
  comments = [],
  postId,
  isLoading,
}: {
  comments: Comment[];
  postId: string;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="flex gap-2 items-start">
            <Skeleton className="w-6 h-6 rounded-full" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments?.length ? (
        comments
          .filter((c) => !c.parentCommentId)
          .map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={postId} />
          ))
      ) : (
        <p className="text-muted-foreground">Henüz yorum yok.</p>
      )}
    </div>
  );
}
