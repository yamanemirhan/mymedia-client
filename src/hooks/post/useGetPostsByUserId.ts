import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/postService";

export const useGetPostsByUserId = (
  userId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["posts", "user", userId],
    queryFn: () => postService.getPostsByUserId(userId),
    enabled: options?.enabled ?? true,
  });
};
