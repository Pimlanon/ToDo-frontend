import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => (
  <div className="bg-background rounded-lg p-3 space-y-2 border">
    <Skeleton className="h-22 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
  </div>
);

export default function SkeletonColumn() {
  <div className="min-w-[300px] h-full w-full bg-muted rounded-xl p-4 flex flex-col gap-3">
    <div className="flex items-center gap-2 mb-2">
      <Skeleton className="h-5 w-24" />
    </div>

    {[1, 2, 3, 4].map((i) => (
      <SkeletonCard key={i} />
    ))}
  </div>;
}
