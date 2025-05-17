import axios from 'axios';
import { tokenService } from '@/services/tokenService';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';

// todo: move to env
const api = axios.create({
  baseURL: 'https://localhost:7019/api/',
});

api.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) {
          authService.logout();
          return Promise.reject(error);
        }

        const response = await api.post('auth/refresh-token', {
          refreshToken,
        });

        const {
          accessToken,
          refreshToken: newRefreshToken,
          accessTokenExpireAt,
          refreshTokenExpireAt,
        } = response.data;

        tokenService.setTokens(
          accessToken,
          newRefreshToken,
          accessTokenExpireAt,
          refreshTokenExpireAt
        );

        useAuthStore.getState().setIsAuthenticated(true);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        authService.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
