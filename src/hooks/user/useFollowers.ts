import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { FollowerResponseDto } from "@/types/follower";

export const useFollowers = (userId: string) => {
  return useQuery<FollowerResponseDto[]>({
    queryKey: ["followers", userId],
    queryFn: () => userService.getFollowers(userId),
    enabled: !!userId,
    retry: false,
  });
};
