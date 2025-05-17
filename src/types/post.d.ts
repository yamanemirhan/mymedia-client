import { AvatarMediaItemType } from "./user";

export interface Post {
  id: string;
  content: string | null;
  createdAt: string;
  updatedAt: string | null;
  mediaItems: PostMediaItemType[];
  comments: any[];
  likedByUserIds: string[];
  savedByUserIds: string[];
  createdBy: {
    id: string;
    userName: string;
    avatar: AvatarMediaItemType;
  };
}

export type PostMediaItemType = {
  url: string;
  type: 'Image' | 'Video';
  order: number;
};
