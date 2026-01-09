import { Button } from "@/components/ui/button";
import { useBuilder } from "@/context/builder-provider";
import { Save } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";
import { saveForm } from "@/actions/form.action";

const SaveForm = () => {
  const [loading, setLoading] = useState(false);
  const { formData, blocks } = useBuilder();
  const handleOnSave = async () => {
    try {
      setLoading(true);
      const formId = formData?.id;
      if (formId) {
        const jsonBlocks = JSON.stringify(blocks);
        const result = await saveForm({ formId, jsonBlocks });
        if (result.success) {
          toast.success("Successfully saved form!");
        } else {
          toast.error(result.message || "Failed to save form!");
        }
      }
    } catch {
      toast.error("Something wrong while saving form!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      variant="outline"
      size="sm"
      className="gap-2 bg-transparent"
      onClick={handleOnSave}
    >
      <Save className="w-4 h-4" />
      <span className="hidden sm:inline">Save</span>
    </Button>
  );
};

export default SaveForm;
