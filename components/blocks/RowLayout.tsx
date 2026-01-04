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
import {
  Active,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn, generateId } from "@/lib/utils";
import { useEffect, useState } from "react";
import { formBlocks } from "@/lib/blocks";
import ChildrenCanvasBlockWrapper from "./ChildrenCanvasBlockWrapper";
import ChildrenPropertiesBlockWrapper from "./ChildrenPropertiesBlockWrapper";

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
    repositionBlock,
    updateChildBlock,
  } = useBuilder();
  const { id, isLocked } = blockInstance;
  const [active, setActive] = useState<Active | null>(null);
  const childBlocks = blockInstance.children || [];

  const isSelected = selectedBlock?.id === id;
  const isCanvasLayoutDragging = active?.data?.current
    ?.isCanvasLayout as boolean;
  const isBlockBtnDragging = active?.data?.current
    ?.isBlockBtnElement as boolean;
  const draggedBlockType = active?.data?.current?.blockType as FormBlockType;
  const isLayoutBtnDragging = (isBlockBtnDragging &&
    draggedBlockType === "RowLayout") as boolean;

  const draggable = useDraggable({
    id: `Canvas-block-${blockInstance.id}`,
    disabled: isLocked || isBlockBtnDragging,
    data: {
      blockId: blockInstance.id,
      blockType: blockInstance.blockType,
      isCanvasLayout: true,
    },
  });

  const topDroppableArea = useDroppable({
    id: `Canvas-drop-top-${blockInstance.id}`,
    disabled: isLocked || isBlockBtnDragging,
    data: {
      blockId: blockInstance.id,
      isLayoutReposition: true,
      insertPosition: "top",
    },
  });

  const bottomDroppableArea = useDroppable({
    id: `Canvas-drop-bottom-${blockInstance.id}`,
    disabled: isLocked,
    data: {
      blockId: blockInstance.id,
      isLayoutReposition: true,
      insertPosition: "bottom",
    },
  });

  const layoutDroggable = useDroppable({
    id: `Layout-drop-${blockInstance.id}`,
    disabled: isLocked || isCanvasLayoutDragging || isLayoutBtnDragging,
    data: {
      id,
      isLayoutDroppable: true,
    },
  });

  useDndMonitor({
    onDragStart: (e) => {
      setActive(e.active);
      console.log(e);
    },
    onDragEnd: (e) => {
      setActive(null);
      const { active, over } = e;
      if (!active || !over) return;
      //Layout Reposition
      const isCanvasLayout = active.data?.current?.isCanvasLayout as boolean;
      const insertPosition = over.data?.current?.insertPosition;
      const isLayoutReposition = over.data?.current
        ?.isLayoutReposition as boolean;
      if (isCanvasLayout && isLayoutReposition) {
        const activeId = active.data?.current?.blockId as string;
        const overId = over.data?.current?.blockId as string;
        if (insertPosition === "top") {
          repositionBlock(activeId, overId, "top");
        } else if (insertPosition === "bottom") {
          repositionBlock(activeId, overId, "bottom");
        }
      }

      //Add Block inside of layout
      const isLayoutDroppable = over.data?.current
        ?.isLayoutDroppable as boolean;

      const isOverThisLayout = (over.data?.current?.id as string) === id;
      if (isBlockBtnDragging && isLayoutDroppable && isOverThisLayout) {
        const newBlock = formBlocks[draggedBlockType].createFormBlockInstance(
          generateId()
        );
        const updatedChildBlock = [...childBlocks, newBlock];
        updateChildBlock(id, updatedChildBlock);
      }
    },
  });

  const deleteChildBlock = (childId: string) => {
    const updatedChildBlock = childBlocks.filter(
      (block) => block.id !== childId
    );
    updateChildBlock(id, updatedChildBlock);
  };

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

      {/* Top Droppable area */}
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
      {/* Bottom Droppable area */}
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

      <div
        className={cn(
          "border border-dashed border-border rounded-lg p-4 transition-colors cursor-pointer",
          layoutDroggable.isOver && "border-2 border-primary"
        )}
      >
        <div ref={layoutDroggable.setNodeRef} className={`gap-4`}>
          {childBlocks.length === 0 ? (
            <Placeholder id={blockInstance.id} />
          ) : (
            <div className="space-y-4">
              {childBlocks.map((block) => (
                <div key={block.id} className="relative">
                  <ChildrenCanvasBlockWrapper
                    key={block.id}
                    blockInstance={block}
                  />
                  {isSelected && !isLocked && (
                    <Button
                      className="absolute top-1/2 -translate-y-1/2 right-0 bg-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChildBlock(block.id);
                      }}
                    >
                      <X />
                    </Button>
                  )}
                </div>
              ))}
            </div>
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
function RowLayoutPropertiesComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const childBlocks = blockInstance.children || [];
  return (
    <>
      {childBlocks.map((block) => (
        <ChildrenPropertiesBlockWrapper
          key={block.id}
          blockInstance={block}
          parentId={blockInstance.id}
        />
      ))}
    </>
  );
}

function Placeholder({ id }: { id: string }) {
  return (
    <div className="min-h-24 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground  transition-colors">
      <div className="flex flex-col items-center gap-2">
        <Plus className="w-5 h-5" />
        <span className="text-xs">Add Block {id}</span>
      </div>
    </div>
  );
}
