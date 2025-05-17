import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { toast } from "sonner";

export const useApproveFollowRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requesterId: string) =>
      userService.approveFollowRequest(requesterId),
    onSuccess: () => {
      toast.success("Takip isteği kabul edildi.");
      queryClient.invalidateQueries({
        queryKey: ["followRequests", "incoming"],
      });
      queryClient.invalidateQueries({ queryKey: ["userProfileByUsername"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error || "Takip isteği onaylanamadı.";
      toast.error(message);
    },
  });
};
