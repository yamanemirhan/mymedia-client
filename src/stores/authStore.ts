import { create } from 'zustand';
import { tokenService } from '@/services/tokenService';

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (authStatus: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!tokenService.getAccessToken() && !tokenService.isAccessTokenExpired(),
  setIsAuthenticated: (authStatus: boolean) => set({ isAuthenticated: authStatus }),
  logout: () => set({ isAuthenticated: false }),
}));
