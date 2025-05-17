import { useMutation } from '@tanstack/react-query';
import { useToast } from '../toast/useToast';
import { uploadMediaToBlob } from '@/services/mediaService';

export const useUploadMedia = () => {
  const { successToast, errorToast } = useToast();

  return useMutation({
    mutationFn: uploadMediaToBlob,
    onSuccess: () => {
      successToast('Medya başarıyla yüklendi');
    },
    onError: (error: any) => {
      errorToast(error.message || 'Medya yüklenirken bir hata oluştu');
    },
  });
};
