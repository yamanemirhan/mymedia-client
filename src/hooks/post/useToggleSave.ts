import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/postService";
import { useToast } from "@/hooks/toast/useToast";

export const useToggleSave = () => {
  const { errorToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => postService.toggleSave(postId),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["saved-posts", postId] });
    },
    onError: (error: any) => {
      errorToast(error.message || "Kaydetme durumu güncellenemedi.");
    },
  });
};
