import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { FollowRequestResponseDto } from "@/types/user";
import { useUserProfile } from "./useUserProfile";

export const useIncomingFollowRequests = () => {
  const { data: user } = useUserProfile();
  return useQuery<FollowRequestResponseDto[]>({
    queryKey: ["followRequests", "incoming"],
    queryFn: () => userService.getIncomingFollowRequests(),
    enabled: !!user?.id,
    retry: false,
  });
};
