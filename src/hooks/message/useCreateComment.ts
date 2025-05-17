import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentService } from "@/services/commentService";
import { useToast } from "@/hooks/toast/useToast";

export const useCreateComment = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentService.createComment,
    onSuccess: (_data, variables) => {
      successToast("Yorum başarıyla gönderildi!");
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
    },
    onError: (error: any) => {
      errorToast(error.message || "Yorum gönderilemedi.");
    },
  });
};
