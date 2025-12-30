import React, { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { FormBlockType } from "@/types/form.blocks.types";
import { formBlocks } from "@/lib/blocks";
import BlockBtnOverlay from "@/components/common/BlockBtnOverlay";
import { useBuilder } from "@/context/builder-provider";

const DragableOverlay = () => {
  const { selectedBlock } = useBuilder();
  const [dragItem, setDragItem] = useState<Active | null>(null);
  let dragNode = <>No node dragged</>;
  useDndMonitor({
    onDragStart: (event) => {
      setDragItem(event.active);
    },
    onDragCancel: (e) => {
      setDragItem(null);
    },
    onDragEnd: (e) => {
      setDragItem(null);
    },
  });

  const isBlockBtnElement = dragItem?.data?.current
    ?.isBlockBtnElement as boolean;

  const isCanvasLayout = dragItem?.data?.current?.isCanvasLayout as boolean;
  if (isBlockBtnElement) {
    const blockType = dragItem?.data?.current?.blocktype as FormBlockType;
    dragNode = <BlockBtnOverlay formBlock={formBlocks[blockType]} />;
  }
  if (isCanvasLayout) {
    if (!selectedBlock) dragNode = <div>No block drag</div>;
    else {
      const CanvasComponent =
        formBlocks[selectedBlock.blockType].canvasComponent;
      dragNode = (
        <div className="pointer-events-none">
          <CanvasComponent blockInstance={selectedBlock} />
        </div>
      );
    }
  }
  return (
    <DragOverlay>
      <div className="opacity-90">{dragNode}</div>
    </DragOverlay>
  );
};

export default DragableOverlay;
