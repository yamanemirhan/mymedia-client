import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { toast } from "sonner";

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => userService.unfollowUser(userId),
    onSuccess: () => {
      toast.success("Takipten çıkıldı");
      queryClient.invalidateQueries({ queryKey: ["followings"] });
      queryClient.invalidateQueries({
        queryKey: ["userProfileByUsername"],
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Takipten çıkılırken bir hata oluştu";
      toast.error(message);
    },
  });
};
