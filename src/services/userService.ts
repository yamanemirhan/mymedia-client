import apiClient from "@/lib/apiClient";
import { FollowerResponseDto } from "@/types/follower";
import { FollowingResponseDto } from "@/types/following";
import {
  FollowRequestResponseDto,
  UpdateUser,
  UserProfile,
} from "@/types/user";

export const userService = {
  getCurrentUser: async (): Promise<UserProfile> => {
    const response = await apiClient.get("user/me");
    return response.data;
  },

  updateUserProfile: async (
    updatedData: Partial<UpdateUser>
  ): Promise<UserProfile> => {
    const response = await apiClient.put<UserProfile>(
      "user/update",
      updatedData
    );
    return response.data;
  },

  getUserByUserId: async (userId: string): Promise<UserProfile> => {
    const response = await apiClient.get(`user/${userId}`);
    return response.data;
  },

  getUserByUsername: async (username: string): Promise<UserProfile> => {
    const response = await apiClient.get(`user/username/${username}`);
    return response.data;
  },

  followUser: async (targetUserId: string): Promise<void> => {
    await apiClient.post(`user/follow/${targetUserId}`);
  },

  cancelFollowRequest: async (receiverId: string): Promise<void> => {
    await apiClient.post(`user/follow/${receiverId}/cancel`);
  },

  unfollowUser: async (userId: string): Promise<void> => {
    await apiClient.post(`user/unfollow/${userId}`);
  },

  approveFollowRequest: async (requesterId: string): Promise<void> => {
    await apiClient.post(`user/follow/${requesterId}/approve`);
  },

  rejectFollowRequest: async (requesterId: string): Promise<void> => {
    await apiClient.post(`user/follow/${requesterId}/reject`);
  },

  getFollowers: async (userId: string): Promise<FollowerResponseDto[]> => {
    const response = await apiClient.get(`user/${userId}/followers`);
    return response.data;
  },

  getFollowings: async (userId: string): Promise<FollowingResponseDto[]> => {
    const response = await apiClient.get(`user/${userId}/followings`);
    return response.data;
  },

  removeFollower: async (followerId: string): Promise<void> => {
    await apiClient.post(`user/followers/${followerId}/remove`);
  },

  getIncomingFollowRequests: async (): Promise<FollowRequestResponseDto[]> => {
    const response = await apiClient.get(`user/follow-requests/incoming`);
    return response.data;
  },

  getOutgoingFollowRequests: async (): Promise<FollowRequestResponseDto[]> => {
    const response = await apiClient.get(`user/follow-requests/outgoing`);
    return response.data;
  },
};
