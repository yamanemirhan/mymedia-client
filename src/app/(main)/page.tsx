"use client";

import PostCard from "@/components/shared/PostCard";
import SkeletonPostCard from "@/components/shared/SkeletonPostCard";
import { Suspense } from "react";
import { usePosts } from "@/hooks/post/usePosts";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Suspense fallback={<SkeletonPostCard />}>
        <PostsList />
      </Suspense>
    </div>
  );
}

function PostsList() {
  const {
    data: posts,
    isPending: loadingPosts,
    error: fetchPostError,
  } = usePosts();

  if (loadingPosts) {
    return (
      <>
        <SkeletonPostCard />
        <SkeletonPostCard />
        <SkeletonPostCard />
      </>
    );
  }

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id} className="w-full flex flex-col items-center">
          <PostCard post={post} />
          <div className="h-[1px] w-full bg-white mt-6" />
        </div>
      ))}
    </>
  );
}
