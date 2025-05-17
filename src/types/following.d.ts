export interface FollowingResponseDto {
  id: string;
  username: string;
  description?: string;
  avatar: {
    avatarUrl: string;
  };
  isFollowedByCurrentUser: boolean;
}
