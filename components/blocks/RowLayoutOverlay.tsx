import { useBuilder } from "@/context/builder-provider";
import { GripVertical, Plus } from "lucide-react";

const RowLayoutOverlay = () => {
  const { selectedBlock } = useBuilder();
  const childBlocks = selectedBlock!.children || [];

  return (
    <div
      className={`group relative 
       ring-2 ring-primary rounded-lg
      `}
    >
      (
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 cursor-move">
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </div>
      )
      <div className="border border-dashed border-border hover:border-primary rounded-lg p-4 transition-colors cursor-pointer">
        <div className={`gap-4`}>
          {childBlocks.length === 0 ? (
            <Placeholder />
          ) : (
            <div>children nodes</div>
          )}
        </div>
      </div>
    </div>
  );
};

function Placeholder() {
  return (
    <div className="min-h-24 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
      <div className="flex flex-col items-center gap-2">
        <Plus className="w-5 h-5" />
        <span className="text-xs">Add Block</span>
      </div>
    </div>
  );
}

export default RowLayoutOverlay;
