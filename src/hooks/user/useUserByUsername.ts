import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { UserProfile } from "@/types/user";

export const useUserByUsername = (username: string) => {
  return useQuery<UserProfile>({
    queryKey: ["userProfileByUsername", username],
    queryFn: () => userService.getUserByUsername(username),
    enabled: !!username,
    retry: false,
  });
};
