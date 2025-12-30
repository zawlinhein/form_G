import {
  FormBlock,
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
} from "@/types/form.blocks.types";
import {
  BetweenHorizontalStart,
  Copy,
  GripVertical,
  Plus,
  Rows3,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { useBuilder } from "@/context/builder-provider";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { useState } from "react";

const blockCategory: FormCategoryType = "Layout";
const blockType: FormBlockType = "RowLayout";

export const RowLayoutBlock: FormBlock = {
  blockCategory,
  blockType,

  createFormBlockInstance: (id: string) => ({
    id,
    blockType,
    isLocked: false,
    properties: {},
    children: [],
  }),

  blockBtnElement: {
    icon: Rows3,
    label: "Row Layout",
  },

  canvasComponent: RowLayoutCanvasComponent,
  formComponent: RowLayoutFormComponent,
  propertiesComponent: RowLayoutPropertiesComponent,
};

function RowLayoutCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const {
    selectedBlock,
    setSelectedBlock,
    deleteBlock,
    copyBlock,
    isLastBlock,
  } = useBuilder();
  const { id, isLocked } = blockInstance;
  const childBlocks = blockInstance.children || [];

  const isSelected = selectedBlock?.id === id;

  const draggable = useDraggable({
    id: `Canvas-block-${blockInstance.id}`,
    disabled: isLocked,
    data: {
      blockId: blockInstance.id,
      blockType: blockInstance.blockType,
      isCanvasComponent: true,
      isCanvasLayout: true,
    },
  });

  const topDroppableArea = useDroppable({
    id: `Canvas-drop-top-${blockInstance.id}`,
    disabled: isLocked,
    data: {
      blockId: blockInstance.id,
      insertPosition: "top",
    },
  });

  const bottomDroppableArea = useDroppable({
    id: `Canvas-drop-bottom-${blockInstance.id}`,
    disabled: isLocked,
    data: {
      blockId: blockInstance.id,
      insertPosition: "bottom",
    },
  });

  return (
    <div
      className={cn(`group relative 
        ${isSelected && "ring-2 ring-primary rounded-lg"}
        ${draggable.isDragging && "opacity-50"}
      `)}
      ref={draggable.setNodeRef}
      onClick={() => setSelectedBlock(blockInstance)}
    >
      {isSelected && (
        <div
          className="absolute -left-8 top-1/2 -translate-y-1/2 cursor-move"
          {...draggable.listeners}
          {...draggable.attributes}
        >
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </div>
      )}

      {/* Droppable area */}
      {selectedBlock && !isSelected && (
        <div
          ref={topDroppableArea.setNodeRef}
          className={cn(
            "absolute -left-4 -top-2 -translate-y-1/2 opacity-50",
            topDroppableArea.isOver && "opacity-100"
          )}
        >
          <BetweenHorizontalStart />
        </div>
      )}

      {selectedBlock && !isSelected && isLastBlock(blockInstance.id) && (
        <div
          ref={bottomDroppableArea.setNodeRef}
          className={cn(
            "absolute -left-4 -bottom-8 -translate-y-1/2 opacity-50",
            bottomDroppableArea.isOver && "opacity-100"
          )}
        >
          <BetweenHorizontalStart />
        </div>
      )}

      {/* Button to cancel select */}
      {isSelected && (
        <div
          className="absolute -top-2.5 -right-6.5 -translate-y-1/2 hover:opacity-80 transition-opacity bg-primary rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedBlock(null);
          }}
        >
          <X />
        </div>
      )}
      <div className="border border-dashed border-border hover:border-primary rounded-lg p-4 transition-colors cursor-pointer">
        <div className={`gap-4`}>
          {childBlocks.length === 0 ? (
            <Placeholder id={blockInstance.id} />
          ) : (
            <div>children nodes</div>
          )}
        </div>
      </div>
      {!isLocked && isSelected && (
        <div className="flex justify-end px-2 py-1 gap-1">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              deleteBlock(blockInstance.id);
            }}
          >
            <Trash2 className="w-2 h-2" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              copyBlock(blockInstance.id);
            }}
          >
            <Copy className="w-2 h-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
function RowLayoutFormComponent() {
  return <div>asdf</div>;
}
function RowLayoutPropertiesComponent() {
  return <div>asdf</div>;
}

function Placeholder({ id }: { id: string }) {
  return (
    <div className="min-h-24 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
      <div className="flex flex-col items-center gap-2">
        <Plus className="w-5 h-5" />
        <span className="text-xs">Add Block {id}</span>
      </div>
    </div>
  );
}
