"use client";

import { useGetSavedPosts } from "@/hooks/post/useGetSavedPosts";
import Spinner from "@/components/shared/Spinner";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircleIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SavedPostsContent({ isActive }: { isActive: boolean }) {
  const { data: savedPosts, isPending: loading } = useGetSavedPosts(undefined, {
    enabled: isActive,
  });
  const router = useRouter();

  const handleOpenModal = (postId: string) => {
    router.push(`/p/${postId}`);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!savedPosts || savedPosts.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-10">
        Kayıtlı gönderi yok.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {savedPosts.flatMap((post) =>
        post.mediaItems.map((item, index) => (
          <Card
            onClick={() => handleOpenModal(post.id)}
            key={`${post.id}-${index}`}
            className="relative overflow-hidden w-[300px] h-[400px] transition-all duration-300 hover:cursor-pointer"
          >
            <CardContent className="absolute inset-0 p-0">
              {item.type === "Image" ? (
                <Image
                  src={item.url}
                  alt="Post image"
                  fill
                  className="object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 flex justify-center items-center hover:opacity-100 hover:bg-black/50 text-white opacity-0 transition-all duration-300">
                <div className="flex gap-4 text-xl">
                  <div className="flex items-center gap-1">
                    <HeartIcon className="w-5 h-5" />
                    <span>{post.likedByUserIds.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircleIcon className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
