"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useGetSinglePost } from "@/hooks/post/useGetSinglePost";
import PostMediaViewer from "@/components/shared/PostMediaViewer";
import PostDetails from "@/components/shared/PostDetails";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function SinglePostModal() {
  const params = useParams();
  const router = useRouter();
  const postId = params?.id as string;
  const { data: post, isLoading } = useGetSinglePost(postId);

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="min-w-[1300px] p-0 bg-white dark:bg-black border-none">
        {isLoading ? (
          <div className="flex items-center justify-center h-96 w-full">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : post ? (
          <div className="flex flex-col md:flex-row w-full h-[80vh]">
            <PostMediaViewer post={post} />
            <PostDetails post={post} />
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            Gönderi bulunamadı.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
