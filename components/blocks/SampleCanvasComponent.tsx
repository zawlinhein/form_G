"use client";

import { GripVertical, Settings, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface RowLayoutBlockProps {
  children?: ReactNode;
  columns?: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
}

export function SampleCanvasComponent({
  children,
  isSelected,
  onSelect,
  onDelete,
}: RowLayoutBlockProps) {
  return (
    <div
      className={`group relative ${
        isSelected ? "ring-2 ring-primary rounded-lg" : ""
      }`}
      onClick={onSelect}
    >
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="border border-dashed border-border hover:border-primary rounded-lg p-4 transition-colors cursor-pointer">
        <div className={`gap-4`}>
          {children ? (
            children
          ) : (
            <>
              <div className="min-h-24 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Plus className="w-5 h-5" />
                  <span className="text-xs">Add Block</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {isSelected && (
        <div className="absolute -right-2 top-2 flex gap-1 bg-card border border-border rounded-lg shadow-lg p-1">
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
