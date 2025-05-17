import { useQuery } from "@tanstack/react-query";
import { commentService } from "@/services/commentService";
import { Comment } from "@/types/comment";

export const useGetCommentsByPostId = (postId: string, enabled = true) => {
  return useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () => commentService.getCommentsByPostId(postId),
    enabled: !!postId && enabled,
  });
};
