import { useCancelFollowRequest } from "@/hooks/user/useCancelFollowRequest";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useOutgoingFollowRequests } from "@/hooks/user/useOutgoingFollowRequests";
import { useCallback } from "react";

interface Props {
  userId: string;
}

export const FollowRequests = ({ userId }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useOutgoingFollowRequests();
  const { mutate: cancelFollowRequest, isPending } = useCancelFollowRequest();

  if (isLoading) return <div>Yükleniyor...</div>;

  if (!data || data.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-10">
        Gönderilen istek yok.
      </div>
    );
  }

  // const handleUsernameClick = useCallback(
  //   (username: string) => {
  //     router.push(`/profile/${username}`);
  //   },
  //   [router]
  // );

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
          <Button
            variant="outline"
            onClick={() => cancelFollowRequest(request.toUserId)}
            disabled={isPending}
          >
            {isPending ? "İptal Ediliyor..." : "İsteği İptal Et"}
          </Button>
        </div>
      ))}
    </div>
  );
};
