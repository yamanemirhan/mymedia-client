import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { FollowingResponseDto } from "@/types/following";

export const useFollowings = (userId: string) => {
  return useQuery<FollowingResponseDto[]>({
    queryKey: ["followings", userId],
    queryFn: () => userService.getFollowings(userId),
    enabled: !!userId,
    retry: false,
  });
};
