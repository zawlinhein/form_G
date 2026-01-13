import React from "react";
import FormItemSkeleton from "./FormItemSkeleton";

const FormListSkeleton = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">All Forms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <FormItemSkeleton />
        <FormItemSkeleton />
        <FormItemSkeleton />
      </div>
    </div>
  );
};

export default FormListSkeleton;
