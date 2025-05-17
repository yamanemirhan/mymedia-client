// useUpdateUserProfile.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useUserStore } from "@/stores/userStore";
import { UpdateUser, UserProfile } from "@/types/user";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const setProfile = useUserStore((state) => state.setProfile);

  return useMutation<UserProfile, AxiosError, Partial<UpdateUser>>({
    mutationFn: userService.updateUserProfile,
    onSuccess: (updatedProfile) => {
      toast.success("Profil başarıyla güncellendi");
      setProfile(updatedProfile);
      queryClient.invalidateQueries({ queryKey: ["userProfileByUsername"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.error || "Profil güncellenirken hata oluştu";
      toast.error(message);
    },
  });
};
