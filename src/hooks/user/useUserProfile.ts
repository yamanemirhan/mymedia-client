import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { UserProfile } from '@/types/user';

export const useUserProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: userService.getCurrentUser,
    retry: false,
  });
};
