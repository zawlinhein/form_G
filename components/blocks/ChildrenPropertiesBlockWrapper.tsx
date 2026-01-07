import { formBlocks } from "@/lib/blocks";
import { FormBlockInstance } from "@/types/form.blocks.types";
import React from "react";

const ChildrenPropertiesBlockWrapper = ({
  blockInstance,
  parentId,
}: {
  blockInstance: FormBlockInstance;
  parentId: string;
}) => {
  const PropertiesComponent =
    formBlocks[blockInstance.blockType].propertiesComponent;
  return (
    <div className="border-2 border-border rounded p-2">
      <PropertiesComponent blockInstance={blockInstance} parentId={parentId} />
    </div>
  );
};

export default ChildrenPropertiesBlockWrapper;
