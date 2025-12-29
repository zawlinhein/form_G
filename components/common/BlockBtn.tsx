import React from "react";
import { Button } from "../ui/button";
import { FormBlock } from "@/types/form.blocks.types";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

type BlockBtnProps = {
  formBlock: FormBlock;
  disabled: boolean;
};

const BlockBtn = ({ formBlock, disabled }: BlockBtnProps) => {
  //dnd-kit setup
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `block-btn-${formBlock.blockType}`,
    disabled: disabled,
    data: { blocktype: formBlock.blockType, isBlockBtnElement: true },
  });

  const { icon: Icon, label } = formBlock.blockBtnElement;
  return (
    <button
      ref={setNodeRef}
      className={cn(
        `flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-accent-foreground/20 transition-all hover:shadow-md disabled:bg-muted ${
          isDragging && "ring-2 ring-ring bg-accent"
        }`
      )}
      disabled={disabled}
      {...listeners}
      {...attributes}
    >
      <Icon className="w-5 h-5 text-muted-foreground" />
      <span className="text-xs font-medium text-center">{label}</span>
    </button>
  );
};

export default BlockBtn;
