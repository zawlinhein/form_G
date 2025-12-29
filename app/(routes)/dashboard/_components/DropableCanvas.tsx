"use client";
import { useBuilder } from "@/context/builder-provider";
import { formBlocks } from "@/lib/blocks";
import { cn, generateId } from "@/lib/utils";
import { FormBlockInstance, FormBlockType } from "@/types/form.blocks.types";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import CanvasComponentWrapper from "./CanvasComponentWrapper";
import { SampleCanvasComponent } from "@/components/blocks/SampleCanvasComponent";

const DropableCanvas = () => {
  const { blocks, setBlocks } = useBuilder();
  const { setNodeRef, isOver } = useDroppable({
    id: "Dropable-Canvas",
    data: {
      isDropableCanvas: true,
    },
  });
  useDndMonitor({
    onDragStart: (e) => {
      //console.log("start", e);
    },
    onDragEnd: (e) => {
      if (e.over) {
        const activeBlockType = e.active.data?.current
          ?.blocktype as FormBlockType;
        const isOverDropableCanvas = e.over.data?.current
          ?.isDropableCanvas as boolean;
        if (activeBlockType === "RowLayout" && isOverDropableCanvas) {
          const newBlockInstance: FormBlockInstance = formBlocks[
            activeBlockType
          ].createFormBlockInstance(generateId());
          setBlocks((prev) => [...prev, newBlockInstance]);
        }
      }
    },
  });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        `bg-card/80 backdrop-blur-sm rounded-lg border border-border shadow-lg overflow-hidden  ${
          isOver && "ring-2 ring-ring"
        }`
      )}
    >
      {/* Hero Image */}
      <div className="h-32 sm:h-40 bg-gradient-to-r from-primary/20 via-accent/30 to-secondary/20 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-50" />
      </div>

      {/* Form Content */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* sample component to test */}
        <SampleCanvasComponent />

        {blocks.map((block) => (
          <CanvasComponentWrapper key={block.id} blockInstance={block} />
        ))}
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

export default DropableCanvas;
