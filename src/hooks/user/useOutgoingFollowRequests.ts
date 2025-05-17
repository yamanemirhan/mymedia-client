import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { FollowRequestResponseDto } from "@/types/user";
import { useUserProfile } from "./useUserProfile";

export const useOutgoingFollowRequests = () => {
  const { data: user } = useUserProfile();
  return useQuery<FollowRequestResponseDto[]>({
    queryKey: ["followRequests", "outgoing", user?.id],
    queryFn: () => userService.getOutgoingFollowRequests(),
    enabled: !!user?.id,
    retry: false,
  });
};
