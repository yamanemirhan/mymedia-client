import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/postService";
import { useToast } from "@/hooks/toast/useToast";

export const useToggleLike = () => {
  const { errorToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postService.toggleLike(postId),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: (error: any) => {
      errorToast(error.message || "Beğeni durumu güncellenemedi.");
    },
  });
};
