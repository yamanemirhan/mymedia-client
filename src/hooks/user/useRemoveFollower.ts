import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { toast } from "sonner";

export const useRemoveFollower = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followerId: string) => userService.removeFollower(followerId),
    onSuccess: () => {
      toast.success("Takipçi kaldırıldı.");
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["userProfileByUsername"] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || "Takipçi kaldırılamadı.";
      toast.error(message);
    },
  });
};
