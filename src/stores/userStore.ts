import { userService } from "@/services/userService";
import { UserProfile } from "@/types/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// todo: store only common data
interface UserState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  initializeProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: UserProfile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
      initializeProfile: async () => {
        try {
          const profile = await userService.getCurrentUser();
          set({ profile });
        } catch {
          set({ profile: null });
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
