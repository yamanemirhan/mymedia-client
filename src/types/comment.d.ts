export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt?: string;

  user: {
    id: string;
    username: string;
    avatar?: AvatarMediaItemType;
  };

  parentCommentId?: string;

  replies?: Comment[];
}
