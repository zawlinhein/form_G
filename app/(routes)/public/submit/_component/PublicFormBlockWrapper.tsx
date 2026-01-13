"use client";
import { saveResponse } from "@/actions/form.action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formBlocks } from "@/lib/blocks";
import { FormBlockInstance, FormValues } from "@/types/form.blocks.types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";

const PublicFormBlockWrapper = ({
  formId,
  blocks,
}: {
  blocks: FormBlockInstance[];
  formId: string;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <Card className="p-8 text-center border-primary/50 bg-primary/5">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Thank You!
          </h2>
          <p className="text-muted-foreground mb-6">
            Your response has been submitted successfully. We appreciate your
            time.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
