import { Skeleton } from "@/components/ui/skeleton"; // Skeleton component from Shadcn UI

const SkeletonProfile = () => (
  <div className="flex items-center gap-6">
    <Skeleton className="w-24 h-24 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-6 w-48" />
      <div className="flex gap-6 text-sm text-muted-foreground">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

export default SkeletonProfile;
