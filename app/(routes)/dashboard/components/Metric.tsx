import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export type MerticProps = {
  title: string;
  value: number;
  description: string;
  isPercentage: boolean;
};

const Metric = ({ title, value, description, isPercentage }: MerticProps) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {isPercentage ? value.toFixed(1) : value}
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Metric;
