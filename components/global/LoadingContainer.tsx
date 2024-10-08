import { Card, CardContent } from "../ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

function LoadingContainer() {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </div>
  );
}
export default LoadingContainer;

function ProductSkeleton() {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className=" h-64 md:h-48 rounded  ">
          <Skeleton className="h-full w-full rounded" />
        </div>
        <div className="mt-4 ">
          <Skeleton className="h-6 w-[250px] mb-3" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </CardContent>
    </Card>
  );
}
