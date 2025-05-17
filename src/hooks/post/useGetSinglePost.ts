import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/postService";

export const useGetSinglePost = (
  id: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => postService.getSinglePost(id),
    enabled: options?.enabled ?? true,
  });
};
