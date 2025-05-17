import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { toast } from "sonner";

export const useRejectFollowRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requesterId: string) =>
      userService.rejectFollowRequest(requesterId),
    onSuccess: () => {
      toast.success("Takip isteği reddedildi.");
      queryClient.invalidateQueries({
        queryKey: ["followRequests", "incoming"],
      });
      queryClient.invalidateQueries({ queryKey: ["userProfileByUsername"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error || "Takip isteği reddedilemedi.";
      toast.error(message);
    },
  });
};
