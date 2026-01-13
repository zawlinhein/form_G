import { addViewsCount, getPublicFormById } from "@/actions/form.action";
import { FormBlockInstance } from "@/types/form.blocks.types";
import PublicFormBlockWrapper from "../_component/PublicFormBlockWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

async function SubmitForm({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;

  const result = await getPublicFormById(formId);
  if (!result.success) {
    return <div>Error: {result.message}</div>;
  }

  const form = result.data;
  await addViewsCount(formId);

  const blocks = JSON.parse(form?.jsonBlock || "[]") as FormBlockInstance[];

  return (
    <div>
      <div className="max-w-4xl mx-auto bg-background my-8 border border-border rounded-lg shadow-md">
        <div className="h-32 sm:h-40 bg-gradient-to-r from-primary/20 via-accent/30 to-secondary/20 relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-50" />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <PublicFormBlockWrapper blocks={blocks} formId={formId} />
        </div>
      </div>
    </div>
  );
}

export default SubmitForm;
