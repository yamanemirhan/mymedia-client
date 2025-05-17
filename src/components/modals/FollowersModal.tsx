"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFollowers } from "@/hooks/user/useFollowers";
import { useUserByUsername } from "@/hooks/user/useUserByUsername";
import { useRemoveFollower } from "@/hooks/user/useRemoveFollower";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  username: string;
};

export const FollowersModal = ({ open, onClose, username }: Props) => {
  const { data: user } = useUserByUsername(username);
  const { data: followers, isLoading } = useFollowers(user?.id || "");
  const { mutate: removeFollower, isPending } = useRemoveFollower();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Takipçiler</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <p>Yükleniyor...</p>
          ) : (
            followers?.map((follower) => (
              <div
                key={follower.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={follower.avatar?.avatarUrl}
                    alt={follower.username}
                    onClick={() => {
                      router.push(`/profile/${follower.username}`);
                    }}
                    className="w-10 h-10 rounded-full object-cover hover:cursor-pointer"
                  />
                  <div>
                    <p
                      onClick={() => {
                        router.push(`/profile/${follower.username}`);
                      }}
                      className="font-medium hover:cursor-pointer"
                    >
                      {follower.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {follower.description}
                    </p>
                  </div>
                </div>
                {follower.isFollowingCurrentUser && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isPending}
                    onClick={() => removeFollower(follower.id)}
                  >
                    Çıkar
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
