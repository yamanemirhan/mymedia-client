import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/postService";

export function useGetSavedPosts(
  userId?: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["saved-posts", userId],
    queryFn: () => postService.getSavedPosts(),
    enabled: options?.enabled,
  });
}
