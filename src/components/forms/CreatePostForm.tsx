"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/toast/useToast";
import { useCreatePost } from "@/hooks/post/useCreatePost";
import { PostMediaItemType } from "@/types/post";
import { z } from "zod";

export default function CreatePostForm() {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { errorToast } = useToast();
  const { mutateAsync: createPost, isPending: isSubmitting } = useCreatePost();

  const schema = z.object({
    content: z
      .string()
      .max(250, "İçerik en fazla 250 karakter olabilir.")
      .optional(),
    mediaItems: z.array(
      z.object({
        url: z.string().url(),
        type: z.enum(["Image", "Video"]),
        order: z.number(),
      })
    ),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles((prev) => [
      ...prev,
      ...(e.target.files ? Array.from(e.target.files) : []),
    ]);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const uploadFiles = async (): Promise<PostMediaItemType[]> => {
    const uploaded: PostMediaItemType[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        errorToast("Bir veya daha fazla dosya yüklenemedi.");
      }

      const data = await res.json();

      uploaded.push({
        url: data.url,
        type: data.fileType.startsWith("video") ? "Video" : "Image",
        order: uploaded.length,
      });
    }

    return uploaded;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let media: PostMediaItemType[] = [];

      const validation = schema.safeParse({ content, mediaItems: media });
      if (!validation.success) {
        setError(validation.error.errors[0].message);
        return;
      }

      if (files.length > 0) {
        media = await uploadFiles();
      }

      await createPost({ content, mediaItems: media });

      setContent("");
      setFiles([]);
    } catch (err: any) {
      setError(err.message || "Gönderi oluşturulamadı");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label htmlFor="content" className="mb-1">
              İçerik
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Bir şeyler yaz..."
            />
          </div>

          <div>
            <Label htmlFor="media" className="mb-1">
              Medya Ekle
            </Label>
            <Input
              id="media"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => {
                const isVideo = file.type.startsWith("video");

                return (
                  <div
                    key={index}
                    className="relative w-24 h-24 border rounded overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-1 right-1 z-10 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                    {isVideo ? (
                      <video
                        src={URL.createObjectURL(file)}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        fill
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className={`${!isLoading ? "cursor-pointer" : ""}`}
          >
            {isLoading ? "Paylaşılıyor..." : "Gönderiyi Paylaş"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
