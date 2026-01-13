import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import React from "react";

const DropableCanvasSkeleton = () => {
  return (
    <div
      className={
        "bg-card/80 backdrop-blur-sm rounded-lg border border-border shadow-lg overflow-hidden"
      }
    >
      {/* Hero Image */}
      <Skeleton className="h-32 w-full bg-muted-foreground rounded" />

      {/* Form Content */}
      <div className="p-6 sm:p-8 space-y-6">
        <Skeleton className="h-20 w-full bg-muted-foreground rounded" />
        <button className="w-full py-4 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-all group">
          <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary">
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add New Field</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DropableCanvasSkeleton;
