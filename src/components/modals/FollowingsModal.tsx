"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFollowings } from "@/hooks/user/useFollowings";
import { useUserByUsername } from "@/hooks/user/useUserByUsername";
import { useUnfollowUser } from "@/hooks/user/useUnfollowUser";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  username: string;
};

export const FollowingsModal = ({ open, onClose, username }: Props) => {
  const { data: user } = useUserByUsername(username);
  const { data: followings, isLoading } = useFollowings(user?.id || "");
  const { mutate: unfollowUser, isPending } = useUnfollowUser();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Takip Edilenler</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <p>Yükleniyor...</p>
          ) : (
            followings?.map((following) => (
              <div
                key={following.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={following.avatar?.avatarUrl}
                    alt={following.username}
                    onClick={() => {
                      router.push(`/profile/${following.username}`);
                    }}
                    className="w-10 h-10 rounded-full object-cover hover:cursor-pointer"
                  />
                  <div>
                    <p
                      onClick={() => {
                        router.push(`/profile/${following.username}`);
                      }}
                      className="font-medium hover:cursor-pointer"
                    >
                      {following.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {following.description}
                    </p>
                  </div>
                </div>
                {following.isFollowedByCurrentUser && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isPending}
                    onClick={() => unfollowUser(following.id)}
                  >
                    Takibi Bırak
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
