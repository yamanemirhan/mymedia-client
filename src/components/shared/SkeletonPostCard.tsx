"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPostCard() {
  return (
    <Card className="w-[500px] bg-black h-[750px] p-4 flex flex-col gap-2 border-none">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-16 h-4 ml-auto" />
      </div>

      <Skeleton className="w-full h-[600px] rounded-lg" />

      <div className="flex gap-2 mt-2">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-6 h-6 rounded-full ml-auto" />
      </div>

      <Skeleton className="w-40 h-4 mt-2" />
      <Skeleton className="w-full h-16 mt-1" />
    </Card>
  );
}
