export interface FollowerResponseDto {
  id: string;
  username: string;
  description?: string;
  avatar: {
    avatarUrl: string;
  };
  isFollowingCurrentUser: boolean;
}
