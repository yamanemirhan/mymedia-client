import api from "@/lib/apiClient";
import { Comment } from "@/types/comment";

interface CreateCommentData {
  postId: string;
  text: string;
  parentCommentId?: string;
}

export const commentService = {
  async createComment(data: CreateCommentData): Promise<Comment> {
    try {
      const response = await api.post<Comment>("/comment/create", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || "Yorum gönderilemedi.");
    }
  },

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    try {
      const response = await api.get<Comment[]>(
        `/comment/post/${postId}/comments`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || "Yorumlar alınamadı.");
    }
  },
};
