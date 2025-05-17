import { PostMediaItemType } from "@/types/post";
import { put } from "@vercel/blob";

export async function uploadMediaToBlob(
  files: File[]
): Promise<PostMediaItemType[]> {
  try {
    const uploaded: PostMediaItemType[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split(".").pop() || "";
      const filename = `post-${Date.now()}-${i}.${extension}`;

      const blob = await put(filename, file, {
        access: "public",
      });

      uploaded.push({
        url: blob.url,
        type: file.type.startsWith("video") ? "Video" : "Image",
        order: i,
      });
    }

    return uploaded;
  } catch (error: any) {
    throw new Error("Dosya yüklenemedi: " + error.message);
  }
}
