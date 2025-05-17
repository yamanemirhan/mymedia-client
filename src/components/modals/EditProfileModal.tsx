"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUpdateUserProfile } from "@/hooks/user/useUpdateUserProfile";
import { useToast } from "@/hooks/toast/useToast";
import { useRouter } from "next/navigation";

const schema = z.object({
  username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalı"),
  avatarUrl: z.string().optional(),
  description: z.string().optional(),
  isPrivate: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function EditProfileModal({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData: FormData;
}) {
  const { register, handleSubmit, setValue, watch, formState } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: initialData,
    });
  const { errorToast } = useToast();
  const { errors } = formState;
  const { mutate: updateUser, isPending } = useUpdateUserProfile();
  const avatarUrl = watch("avatarUrl");
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const prevUsername = initialData.username;
    updateUser(data, {
      onSuccess: () => {
        onClose();

        if (data.username !== prevUsername) {
          router.push(`/profile/${data.username}`);
        }
      },
    });
  };

  const uploadFile = async (
    file: File
  ): Promise<{ url: string; fileType: string }> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      errorToast("Dosya yüklenemedi.");
    }

    return await res.json();
  };

  const handleFileUpload = async (file: File) => {
    try {
      const uploadedFile = await uploadFile(file);
      setValue("avatarUrl", uploadedFile.url);
    } catch (err: any) {
      errorToast("Dosya yüklenirken hata oluştu", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profilini Düzenle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Kullanıcı Adı"
            {...register("username")}
            error={errors.username?.message}
          />
          <Textarea
            label="Açıklama"
            {...register("description")}
            error={errors.description?.message}
          />
          <div>
            <label className="block text-sm font-medium">
              Profil Fotoğrafı
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />

            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="mt-2 w-16 h-16 rounded-full"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("isPrivate")} />
            <label>Hesabı Gizli Yap</label>
          </div>
          <Button type="submit" disabled={isPending}>
            Güncelle
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
