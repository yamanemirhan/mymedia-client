"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HeartIcon,
  ImageIcon,
  MessageCircleIcon,
  VideoIcon,
  ImagesIcon,
  SquarePlay,
  UserPlusIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useGetPostsByUserId } from "@/hooks/post/useGetPostsByUserId";
import { useUserByUsername } from "@/hooks/user/useUserByUsername";
import Spinner from "@/components/shared/Spinner";
import SkeletonProfile from "@/components/shared/SkeletonProfile";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";
import SavedPostsContent from "@/components/shared/SavedPostsContent";
import { useFollowUser } from "@/hooks/user/useFollowUser";
import { useCancelFollowRequest } from "@/hooks/user/useCancelFollowRequest";
import { useUnfollowUser } from "@/hooks/user/useUnfollowUser";
import { useApproveFollowRequest } from "@/hooks/user/useApproveFollowRequest";
import { useRejectFollowRequest } from "@/hooks/user/useRejectFollowRequest";
import { FollowersModal } from "@/components/modals/FollowersModal";
import { FollowingsModal } from "@/components/modals/FollowingsModal";
import Link from "next/link";
import { FollowRequests } from "@/components/shared/FollowRequests";
import { FollowingRequests } from "@/components/shared/FollowingRequests";
import { EditProfileModal } from "@/components/modals/EditProfileModal";

const ProfilePage = () => {
  const router = useRouter();
  const searchParams = useParams();
  const [modal, setModal] = useState<"followers" | "followings" | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const { profile } = useUserStore();
  const { mutateAsync: followUser, isPending: isFollowPending } =
    useFollowUser();
  const { mutate: cancelFollowRequest, isPending: isCancelFollowPending } =
    useCancelFollowRequest();
  const { data: user, isPending: userLoading } = useUserByUsername(
    searchParams.username as string
  );
  const { mutate: unfollowUser, isPending: isUnfollowPending } =
    useUnfollowUser();
  const { data: posts, isPending: postsLoading } = useGetPostsByUserId(
    user?.id ?? ""
  );
  const { mutate: approveFollow, isPending: isApprovePending } =
    useApproveFollowRequest();
  const { mutate: rejectFollow, isPending: isRejectPending } =
    useRejectFollowRequest();

  const userData = {
    username: profile?.username ?? "",
    avatarUrl: profile?.avatar.avatarUrl ?? "",
    description: profile?.description ?? "",
    isPrivate: profile?.isPrivate ?? false,
  };

  const handleOpenModal = (postId: string) => {
    router.push(`/p/${postId}`);
  };

  const handleOpen = (type: "followers" | "followings") => {
    setModal(type);
  };

  const handleClose = () => {
    setModal(null);
  };

  if (userLoading) {
    return <SkeletonProfile />;
  }

  const isCurrentUser = profile?.id === user?.id;
  const canViewPrivateContent =
    !user?.isPrivate || isCurrentUser || user?.isFollowedByCurrentUser;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-2xl font-semibold mb-2">
          Üzgünüz, bu sayfaya ulaşılamıyor.
        </h1>
        <p className="text-gray-500 mb-4">
          Tıkladığın bağlantı bozuk olabilir veya sayfa kaldırılmış olabilir.
        </p>
        <Link
          href="/"
          className="text-blue-500 underline hover:text-blue-700 transition"
        >
          MyMedia'ya geri dön
        </Link>
      </div>
    );
  }

  const handleFollow = async () => {
    if (user?.id) {
      await followUser(user.id);
    }
  };

  const handleCancelFollowRequest = async () => {
    if (user?.id) {
      cancelFollowRequest(user.id);
    }
  };

  const handleUnfollow = async () => {
    if (user?.id) {
      unfollowUser(user.id);
    }
  };

  const handleApproveFollowRequest = async () => {
    if (user?.id) {
      approveFollow(user.id);
    }
  };

  const handleRejectFollowRequest = async () => {
    if (user?.id) {
      rejectFollow(user.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user?.avatar.avatarUrl} alt={user?.username} />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">{user?.username}</h2>
            <div className="ml-4 flex items-center gap-4">
              {user?.username !== profile?.username ? (
                <>
                  {user?.isFollowedByCurrentUser ? (
                    <Button
                      variant="secondary"
                      disabled={isUnfollowPending}
                      onClick={handleUnfollow}
                      className="hover:cursor-pointer"
                    >
                      Takipten Çık
                    </Button>
                  ) : user?.hasPendingFollowRequestFromCurrentUser ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        disabled
                        className="cursor-default"
                      >
                        İstek Gönderildi
                      </Button>
                      <Button
                        variant="ghost"
                        disabled={isCancelFollowPending}
                        onClick={handleCancelFollowRequest}
                        className="hover:cursor-pointer text-red-500"
                      >
                        İsteği İptal Et
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handleFollow}
                      variant="default"
                      className="hover:cursor-pointer"
                    >
                      Takip Et
                    </Button>
                  )}

                  <Button variant="default" className="hover:cursor-pointer">
                    Mesaj Gönder
                  </Button>

                  {user?.hasSentFollowRequestToCurrentUser && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="default"
                        disabled={isApprovePending}
                        onClick={handleApproveFollowRequest}
                        className="hover:cursor-pointer"
                      >
                        Onayla
                      </Button>
                      <Button
                        variant="destructive"
                        disabled={isRejectPending}
                        onClick={handleRejectFollowRequest}
                        className="hover:cursor-pointer"
                      >
                        Reddet
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  variant="outline"
                  className="hover:cursor-pointer"
                >
                  Profili Düzenle
                </Button>
              )}
            </div>
            <EditProfileModal
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              initialData={userData}
            />
          </div>

          <div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span>
                <strong>{user?.postCount}</strong> gönderi
              </span>
              <span
                className={
                  canViewPrivateContent ? "cursor-pointer" : "cursor-default"
                }
                onClick={
                  canViewPrivateContent
                    ? () => handleOpen("followers")
                    : undefined
                }
              >
                <strong>{user?.followersCount}</strong> takipçi
              </span>
              <span
                className={
                  canViewPrivateContent ? "cursor-pointer" : "cursor-default"
                }
                onClick={
                  canViewPrivateContent
                    ? () => handleOpen("followings")
                    : undefined
                }
              >
                <strong>{user?.followingCount}</strong> takip
              </span>
            </div>

            {modal === "followers" && searchParams.username && (
              <FollowersModal
                open={true}
                onClose={handleClose}
                username={searchParams.username as string}
              />
            )}
            {modal === "followings" && searchParams.username && (
              <FollowingsModal
                open={true}
                onClose={handleClose}
                username={searchParams.username as string}
              />
            )}
          </div>
          <p className="text-sm">{user?.description || "Açıklama yok."}</p>
        </div>
      </div>

      {canViewPrivateContent ? (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="flex gap-4 border-b pb-2">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Gönderiler
            </TabsTrigger>
            <TabsTrigger value="saves" className="flex items-center gap-2">
              <VideoIcon className="w-4 h-4" /> Kaydedilenler
            </TabsTrigger>
            {isCurrentUser && (
              <TabsTrigger
                value="follower-requests"
                className="flex items-center gap-2"
              >
                <UserPlusIcon className="w-4 h-4" /> Gönderilen Takip İstekleri
              </TabsTrigger>
            )}
            {isCurrentUser && (
              <TabsTrigger
                value="following-requests"
                className="flex items-center gap-2"
              >
                <UserPlusIcon className="w-4 h-4" /> Gelen Takip İstekleri
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="posts">
            {postsLoading ? (
              <Spinner />
            ) : posts && posts.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {posts.map((post) => {
                  const firstMedia = post.mediaItems.find(
                    (item) => item.order === 0
                  );

                  if (!firstMedia) return null;

                  const hasMultipleMedia = post.mediaItems.length > 1;

                  return (
                    <Card
                      onClick={() => handleOpenModal(post.id)}
                      key={post.id}
                      className="relative overflow-hidden w-[300px] h-[400px] transition-all duration-300 hover:cursor-pointer"
                    >
                      {firstMedia.type === "Video" ? (
                        <div className="absolute top-2 right-2 z-10 bg-black/60 p-1 rounded-full text-white">
                          <SquarePlay className="w-4 h-4" />
                        </div>
                      ) : hasMultipleMedia ? (
                        <div className="absolute top-2 right-2 z-10 bg-black/60 p-1 rounded-full text-white">
                          <ImagesIcon className="w-4 h-4" />
                        </div>
                      ) : null}

                      <CardContent className="absolute inset-0 p-0">
                        {firstMedia.type === "Image" ? (
                          <Image
                            src={firstMedia.url}
                            alt="Post image"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <video
                            src={firstMedia.url}
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
                  );
                })}
              </div>
            ) : (
              <div className="text-muted-foreground text-center py-10">
                Gönderi yok.
              </div>
            )}
          </TabsContent>

          <TabsContent value="saves">
            <SavedPostsContent isActive={activeTab === "saves"} />
          </TabsContent>

          {isCurrentUser && (
            <TabsContent value="follower-requests">
              {profile?.id && <FollowRequests userId={profile.id} />}
            </TabsContent>
          )}

          {isCurrentUser && (
            <TabsContent value="following-requests">
              {profile?.id && <FollowingRequests userId={profile.id} />}
            </TabsContent>
          )}
        </Tabs>
      ) : (
        <div className="text-center text-muted-foreground py-10">
          Bu profil gizlidir. Takip etmek için istekte bulunun.
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
