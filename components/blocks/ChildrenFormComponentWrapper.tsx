import { formBlocks } from "@/lib/blocks";
import { FormBlockInstance } from "@/types/form.blocks.types";
import React from "react";

const ChildrenFormComponentWrapper = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const FormComponent = formBlocks[blockInstance.blockType].formComponent;
  return (
    <>
      <FormComponent blockInstance={blockInstance} />
    </>
  );
};

export default ChildrenFormComponentWrapper;
