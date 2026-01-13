import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div>
      <div className="max-w-4xl mx-auto bg-background my-8 border border-border rounded-lg shadow-md">
        <Skeleton className="h-32 w-full bg-muted-foreground rounded" />

        <div className="p-6 sm:p-8 space-y-6">
          <Skeleton className="h-20 w-full bg-muted-foreground rounded" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
