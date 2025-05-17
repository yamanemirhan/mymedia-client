import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '../../hooks/toast/useToast'; 

export const useLogin = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const router = useRouter();
  const { errorToast, successToast } = useToast();

  return useMutation({
    mutationFn: authService.loginUser,
    onSuccess: () => {
      setIsAuthenticated(true);
      router.push('/');
      successToast("Giriş başarılı");
    },
    onError: (error: any) => {
      errorToast(error.message, {
        duration: 5000,
        action: {
          label: 'Tamam',
          onClick: () => {},
        },
      });
    },
  });
};
