import api from "@/lib/apiClient";
import { Post, PostMediaItemType } from "@/types/post";

interface CreatePostData {
  content: string;
  mediaItems: PostMediaItemType[];
}

export const postService = {
  async createPost(data: CreatePostData): Promise<void> {
    try {
      await api.post("/post/create", data);
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || "Post oluşturulamadı");
    }
  },

  async getPosts(): Promise<Post[]> {
    try {
      const response = await api.get<Post[]>("/post/all");
      return response.data;
    } catch (error) {
      console.error("Postları çekerken hata oluştu:", error);
      throw error;
    }
  },

  async toggleLike(postId: string): Promise<Post> {
    try {
      const response = await api.post(`/post/${postId}/like`);
      return response.data;
    } catch (error) {
      console.error("Like/Unlike sırasında hata oluştu:", error);
      throw error;
    }
  },

  async getSinglePost(postId: string): Promise<Post> {
    try {
      const response = await api.get(`/post/${postId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || "Post yüklenemedi.");
    }
  },

  async getPostsByUserId(userId: string): Promise<Post[]> {
    try {
      const response = await api.get<Post[]>(`/post/user/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.error || "Kullanıcının postları yüklenemedi."
      );
    }
  },

  async toggleSave(postId: string): Promise<Post> {
    try {
      const response = await api.post(`/post/${postId}/save`);
      return response.data;
    } catch (error) {
      console.error("Save/Unsave sırasında hata oluştu:", error);
      throw error;
    }
  },

  async getSavedPosts(): Promise<Post[]> {
    try {
      const response = await api.get<Post[]>("/post/saved");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.error || "Kaydedilen postlar yüklenemedi."
      );
    }
  },
};
