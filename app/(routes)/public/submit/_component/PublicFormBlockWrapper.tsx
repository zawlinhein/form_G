"use client";
import { saveResponse } from "@/actions/form.action";
import { Button } from "@/components/ui/button";
import { formBlocks } from "@/lib/blocks";
import { FormBlockInstance, FormValues } from "@/types/form.blocks.types";
import { is } from "drizzle-orm";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const PublicFormBlockWrapper = ({
  formId,
  blocks,
}: {
  blocks: FormBlockInstance[];
  formId: string;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrors({});
    let isErr = false;
    let responseData: Record<string, string>[] = [];
    blocks.forEach((block) => {
      block?.children?.forEach((child) => {
        if (child.properties?.required && !data[child.id]) {
          setErrors((prev) => ({
            ...prev,
            [child.id]: `This field is required.`,
          }));
          isErr = true;
        } else if (data[child.id]) {
          const label = child.properties?.label || (child.blockType as string);
          responseData.push({ label: label, value: data[child.id] });
        }
      });
    });
    if (!isErr) {
      const responsePayload = JSON.stringify(responseData);
      const result = await saveResponse({ formId, responses: responsePayload });
      if (!result.success) {
        alert(`Error submitting form: ${result.message}`);
        return;
      }
      alert("Form submitted successfully!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {blocks.map((block) => {
          const FormComponent = formBlocks[block.blockType].formComponent;
          return (
            <FormComponent
              key={block.id}
              blockInstance={block}
              useFormProps={{ register, setValue, errors }}
            />
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default PublicFormBlockWrapper;
