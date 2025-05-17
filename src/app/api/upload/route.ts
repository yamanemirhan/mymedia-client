import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
  }

  try {
    const originalName = file.name.split(".")[0];
    const extension = file.name.split(".").pop();

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const shortId = randomUUID().slice(0, 6);
    const customName =
      `${originalName}-${timestamp}-${shortId}.${extension}`.toLowerCase();

    const blob = await put(customName, file, {
      access: "public",
    });

    return NextResponse.json({
      url: blob.url,
      fileType: file.type,
      size: file.size,
      fileName: customName,
    });
  } catch (error) {
    console.error("Yükleme hatası:", error);
    return NextResponse.json(
      { error: "Dosya yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
