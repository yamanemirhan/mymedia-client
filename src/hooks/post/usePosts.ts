import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/postService";
import { Post } from "@/types/post";

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: postService.getPosts,
    // staleTime: 1000 * 60 * 5, // 5 dakika cache
    retry: 1,
  });
};
