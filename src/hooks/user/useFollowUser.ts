import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { toast } from "sonner";

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: string) => userService.followUser(targetUserId),
    onSuccess: (_data, targetUserId) => {
      toast.success("Kullanıcı takip edildi");
      queryClient.invalidateQueries({
        queryKey: ["userProfileByUsername"],
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Takip sırasında bir hata oluştu";
      toast.error(message);
    },
  });
};
