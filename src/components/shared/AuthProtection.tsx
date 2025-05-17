"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { tokenService } from "@/services/tokenService";
import { ReactNode } from "react";

export default function AuthProtection({ children }: { children: ReactNode }) {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const { clearProfile, initializeProfile } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const token = tokenService.getAccessToken();
      if (token && !tokenService.isAccessTokenExpired()) {
        try {
          await initializeProfile();
          setIsAuthenticated(true);
        } catch (err) {
          clearProfile();
          setIsAuthenticated(false);
          tokenService.clearTokens();
        }
      } else {
        clearProfile();
        setIsAuthenticated(false);
      }
    };

    init();
  }, [initializeProfile, setIsAuthenticated, clearProfile]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
