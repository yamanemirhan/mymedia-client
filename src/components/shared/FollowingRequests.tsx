import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useApproveFollowRequest } from "@/hooks/user/useApproveFollowRequest";
import { useRejectFollowRequest } from "@/hooks/user/useRejectFollowRequest";
import { useIncomingFollowRequests } from "@/hooks/user/useIncomingFollowRequests";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
}

export const FollowingRequests = ({ userId }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useIncomingFollowRequests();

  const { mutate: approveFollow, isPending: approving } =
    useApproveFollowRequest();

  const { mutate: rejectFollow, isPending: rejecting } =
    useRejectFollowRequest();

  if (isLoading) return <div>Yükleniyor...</div>;

  if (!data || data.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-10">
        Gelen istek yok.
      </div>
    );
  }

  //   const handleUsernameClick = useCallback(
  //     (username: string) => {
  //       router.push(`/profile/${username}`);
  //     },
  //     [router]
  //   );

  return (
    <div className="space-y-4">
      {data.map((request) => (
        <div
          key={request.requestId}
          className="flex items-center justify-between border p-4 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={request.user.avatar?.avatarUrl || ""} />
            </Avatar>
            <div>{request.user.username}</div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => approveFollow(request.fromUserId)}
              disabled={approving}
            >
              Onayla
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => rejectFollow(request.fromUserId)}
              disabled={rejecting}
            >
              Reddet
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
