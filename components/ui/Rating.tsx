"use client";

import { useState } from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { UseFormRegister } from "react-hook-form";
import { FormValues, useFormProps } from "@/types/form.blocks.types";

export function Rating({
  useFormProps,
  id,
}: {
  id: string;
  useFormProps?: useFormProps;
}) {
  const [rating, setRating] = useState(0);
  return (
    <>
      <ReactRating
        style={{ maxWidth: 100 }}
        value={rating}
        onChange={(value: number) => {
          setRating(value);
          if (useFormProps) {
            useFormProps.setValue(id, value.toString(), { shouldDirty: true });
          }
        }}
      />
    </>
  );
}
