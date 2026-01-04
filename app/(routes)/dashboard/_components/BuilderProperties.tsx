import { Button } from "@/components/ui/button";
import { useBuilder } from "@/context/builder-provider";
import { formBlocks } from "@/lib/blocks";
import { FormBlockInstance } from "@/types/form.blocks.types";
import { Trash2, X } from "lucide-react";
import React from "react";

const BuilderProperties = () => {
  const { selectedBlock, setSelectedBlock } = useBuilder();
  if (!selectedBlock) return;
  const SelectedPropertiesComponent =
    formBlocks[selectedBlock?.blockType].propertiesComponent;
  return (
    <div className="w-80 border-l border-border bg-card/50 backdrop-blur-sm flex flex-col sticky">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Block Properties</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setSelectedBlock(null)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Block Type */}
        <SelectedPropertiesComponent blockInstance={selectedBlock} />
      </div>
    </div>
  );
};

export default BuilderProperties;
