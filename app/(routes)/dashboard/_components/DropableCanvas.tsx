"use client";
import { useBuilder } from "@/context/builder-provider";
import { formBlocks } from "@/lib/blocks";
import { cn, generateId } from "@/lib/utils";
import { FormBlockInstance, FormBlockType } from "@/types/form.blocks.types";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import CanvasComponentWrapper from "./CanvasComponentWrapper";
import { SampleCanvasComponent } from "@/components/blocks/SampleCanvasComponent";
import { useState } from "react";

const DropableCanvas = () => {
  const { blocks, setBlocks, loading, repositionBlock } = useBuilder();
  const [isDisable, setIsDisable] = useState(false);
  const { setNodeRef, isOver } = useDroppable({
    id: "Dropable-Canvas",
    disabled: isDisable,
    data: {
      isDropableCanvas: true,
    },
  });
  useDndMonitor({
    onDragStart: (e) => {
      //console.log("Drag start", e);
      const isCanvasComponent = e.active.data?.current
        ?.isCanvasComponent as boolean;
      if (isCanvasComponent) {
        setIsDisable(true);
      } else setIsDisable(false);
    },
    onDragEnd: (e) => {
      //console.log("Drag end", e);
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

        const isCanvasComponent = e.active.data?.current
          ?.isCanvasComponent as boolean;
        const insertPosition = e.over.data?.current?.insertPosition;
        if (isCanvasComponent) {
          const activeId = e.active.data?.current?.blockId as string;
          const overId = e.over.data?.current?.blockId as string;
          if (insertPosition === "top") {
            repositionBlock(activeId, overId, "top");
          } else if (insertPosition === "bottom") {
            repositionBlock(activeId, overId, "bottom");
          }
        }
      }
    },
  });

  if (loading) return <div>loading.....</div>;
  return (
    <div
      className={cn(
        "bg-card/80 backdrop-blur-sm rounded-lg border border-border shadow-lg overflow-hidden",
        isOver && "ring-2 ring-ring"
      )}
    >
      {/* Hero Image */}

      <div
        ref={setNodeRef}
        className="h-32 sm:h-40 bg-gradient-to-r from-primary/20 via-accent/30 to-secondary/20 relative"
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-50" />
      </div>

      {/* Form Content */}
      <div className="p-6 sm:p-8 space-y-6">
        {/*  sample component to test 
      <SampleCanvasComponent />  */}

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
