export interface UserProfile {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string | null;
  isAdmin: boolean;
  avatar: AvatarMediaItemType;

  isPrivate: boolean;

  postCount: number;
  likedPostCount: number;
  savedPostCount: number;
  commentCount: number;
  commentLikeCount: number;

  description?: string;

  followersCount: number;
  followingCount: number;

  isFollowedByCurrentUser: boolean;
  hasPendingFollowRequestFromCurrentUser: boolean;
  hasSentFollowRequestToCurrentUser: boolean;
  IsFollowingCurrentUser: boolean;
}

export interface AvatarMediaItemType {
  avatarUrl: string;
}

export interface FollowRequestResponseDto {
  requestId: string;
  fromUserId: string;
  toUserId: string;
  createdAt: string;
  user: UserMiniResponseDto;
}

export interface UserMiniResponseDto {
  id: string;
  username: string;
  avatar?: AvatarMediaItemType | null;
}

export interface UpdateUser {
  username: string;
  avatarUrl?: string | null;
  description?: string | null;
  isPrivate: boolean;
}
