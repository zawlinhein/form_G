import React, { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { FormBlockType } from "@/types/form.blocks.types";
import { formBlocks } from "@/lib/blocks";
import BlockBtnOverlay from "@/components/common/BlockBtnOverlay";

const DragableOverlay = () => {
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
  if (isBlockBtnElement) {
    const blockType = dragItem?.data?.current?.blocktype as FormBlockType;
    dragNode = <BlockBtnOverlay formBlock={formBlocks[blockType]} />;
  }
  return (
    <DragOverlay>
      <div className="opacity-90">{dragNode}</div>
    </DragOverlay>
  );
};

export default DragableOverlay;
