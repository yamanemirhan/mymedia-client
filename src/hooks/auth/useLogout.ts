import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useToast } from "../../hooks/toast/useToast";

export const useLogout = () => {
  const router = useRouter();
  const { successToast, errorToast } = useToast();

  const mutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      successToast("Başarıyla çıkış yapıldı");
      router.push("/auth/login");
    },
    onError: (error: any) => {
      errorToast(error.message || "Çıkış yaparken bir hata oluştu", {
        duration: 5000,
        action: {
          label: "Tamam",
          onClick: () => {},
        },
      });
    },
  });

  return (e?: React.MouseEvent) => {
    mutation.mutate();
  };
};
