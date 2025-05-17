import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { toast } from "sonner";

export const useCancelFollowRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (receiverId: string) =>
      userService.cancelFollowRequest(receiverId),
    onSuccess: () => {
      toast.success("Takip isteği iptal edildi");
      queryClient.invalidateQueries({
        queryKey: ["followRequests", "outgoing"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userProfileByUsername"],
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Takip isteği iptal edilirken bir hata oluştu";
      toast.error(message);
    },
  });
};
