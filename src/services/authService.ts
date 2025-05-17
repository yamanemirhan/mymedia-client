import { useAuthStore } from '../stores/authStore';
import { tokenService } from './tokenService';
import api from '@/lib/apiClient';
import { useUserStore } from '@/stores/userStore';

export interface UserAuthInfo {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireAt: string;
  refreshTokenExpireAt: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async registerUser(data: RegisterData): Promise<UserAuthInfo> {
    try {
      const response = await api.post('auth/register', data);
      const userData = response.data;

      tokenService.setTokens(
        userData.accessToken,
        userData.refreshToken,
        userData.accessTokenExpireAt,
        userData.refreshTokenExpireAt
      );

      useAuthStore.getState().setIsAuthenticated(true);
      useUserStore.getState().setProfile(userData.user);
      
      return userData;
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || 'Kayıt işlemi başarısız');
    }
  },

  async loginUser(data: LoginData): Promise<UserAuthInfo> {
    try {
      const response = await api.post('auth/login', data);
      const userData = response.data;

      tokenService.setTokens(
        userData.accessToken,
        userData.refreshToken,
        userData.accessTokenExpireAt,
        userData.refreshTokenExpireAt
      );

      useAuthStore.getState().setIsAuthenticated(true);
      useUserStore.getState().setProfile(userData.user);

      return userData;
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || 'Giriş başarısız');
    }
  },

  async refreshToken(): Promise<string> {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await api.post('auth/refresh-token', { refreshToken });

      const {
        accessToken,
        refreshToken: newRefreshToken,
        accessTokenExpireAt,
        refreshTokenExpireAt
      } = response.data;

      tokenService.setTokens(accessToken, newRefreshToken, accessTokenExpireAt, refreshTokenExpireAt);

      return accessToken;
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || 'Token yenileme başarısız');
    }
  },

  async logout(): Promise<void> {
    try {
      tokenService.clearTokens();
      useAuthStore.getState().logout();
    } catch (error: any) {
      throw new Error('Bir hata meydana geldi. Lütfen tekrar deneyin.');
    }
  }
};
