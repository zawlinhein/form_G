import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBuilder } from "@/context/builder-provider";
import { Eye } from "lucide-react";
import React from "react";
import FormComponentWrapper from "./FormComponentWrapper";

const Preview = () => {
  const { blocks } = useBuilder();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Preview</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[90vw] h-[80vh] max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Preview Mode</DialogTitle>
          <div className="h-32 sm:h-40 bg-gradient-to-r from-primary/20 via-accent/30 to-secondary/20 relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-50" />
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {blocks.map((block) => (
              <FormComponentWrapper key={block.id} blockInstance={block} />
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Preview;
