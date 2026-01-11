import { formBlocks } from "@/lib/blocks";
import {
  FormBlockInstance,
  FormValues,
  useFormProps,
} from "@/types/form.blocks.types";
import React from "react";
import { UseFormRegister } from "react-hook-form";

const ChildrenFormComponentWrapper = ({
  blockInstance,
  useFormProps,
}: {
  blockInstance: FormBlockInstance;
  useFormProps?: useFormProps;
}) => {
  const FormComponent = formBlocks[blockInstance.blockType].formComponent;
  return (
    <>
      <FormComponent
        blockInstance={blockInstance}
        useFormProps={useFormProps}
      />
    </>
  );
};

export default ChildrenFormComponentWrapper;
