import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/postService";
import { useToast } from "@/hooks/toast/useToast";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

export const useCreatePost = () => {
  const { successToast, errorToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { profile } = useUserStore();

  return useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      successToast("Post başarıyla oluşturuldu!");
      // todo
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push(`/profile/${profile?.username}`);
    },
    onError: (error: any) => {
      errorToast(error.message || "Post oluşturulamadı");
    },
  });
};
