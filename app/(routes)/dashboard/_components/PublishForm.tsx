import { publishForm } from "@/actions/form.action";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/context/builder-provider";
import { Send } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const PublishForm = () => {
  const [loading, setLoading] = useState(false);
  const { formData, setFormData } = useBuilder();
  const isPublished = formData?.published;
  const handleOnPublish = async () => {
    try {
      setLoading(true);
      const formId = formData?.id;
      if (formId) {
        const result = await publishForm({ formId, published: !isPublished });
        if (result.success) {
          const published = result.data?.published || false;
          setFormData((prev) =>
            prev ? { ...prev, published: published } : prev
          );
          toast.success(
            `Successfully ${published ? "published" : "unpublished"} form!`
          );
        } else {
          toast.error(result.message || "Failed to publish form!");
        }
      }
    } catch {
      toast.error("Something wrong while publishing form!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      size="sm"
      className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
      disabled={loading}
      onClick={handleOnPublish}
    >
      <Send className="w-4 h-4" />
      <span className="hidden sm:inline">
        {isPublished ? "Unpublish" : "Publish"}
      </span>
    </Button>
  );
};

export default PublishForm;
