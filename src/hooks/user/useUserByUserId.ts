import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { UserProfile } from "@/types/user";

export const useUserByUserId = (userId: string) => {
  return useQuery<UserProfile>({
    queryKey: ["user", userId],
    queryFn: () => userService.getUserByUserId(userId),
    enabled: !!userId,
    retry: false,
  });
};
