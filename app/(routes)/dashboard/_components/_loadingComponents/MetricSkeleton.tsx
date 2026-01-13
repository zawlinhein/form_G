import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export type MetricSkeletonProps = {
  title: string;
  description: string;
};

const MetricSkeleton = ({ title, description }: MetricSkeletonProps) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          <Skeleton className="h-8 w-20 bg-muted-foreground" />
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default MetricSkeleton;
