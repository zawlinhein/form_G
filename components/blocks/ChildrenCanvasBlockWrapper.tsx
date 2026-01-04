import { formBlocks } from "@/lib/blocks";
import { FormBlockInstance } from "@/types/form.blocks.types";
import React from "react";

const ChildrenCanvasBlockWrapper = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const ChildrenCanvasComponent =
    formBlocks[blockInstance.blockType].canvasComponent;
  return (
    <div>
      <ChildrenCanvasComponent blockInstance={blockInstance} />
    </div>
  );
};

export default ChildrenCanvasBlockWrapper;
