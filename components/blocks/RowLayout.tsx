import {
  FormBlock,
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
} from "@/types/form.blocks.types";
import { Copy, GripVertical, Plus, Rows3, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useBuilder } from "@/context/builder-provider";

const blockCategory: FormCategoryType = "Layout";
const blockType: FormBlockType = "RowLayout";

export const RowLayoutBlock: FormBlock = {
  blockCategory,
  blockType,

  createFormBlockInstance: (id: string) => ({
    id,
    blockType,
    isBlock: false,
    properties: {},
    children: [],
  }),

  blockBtnElement: {
    icon: Rows3,
    label: "Row Layout",
  },

  canvasComponent: RowLayoutCanvasComponent,
  formComponent: RowLayoutFormComponent,
  propertiesComponent: RowLayoutPropertiesComponent,
};

function RowLayoutCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const { deleteBlock, copyBlock } = useBuilder();
  const { id, isBlock } = blockInstance;
  const childBlocks = blockInstance.children || [];

  return (
    <div
      className={`group relative 
        ${false && "ring-2 ring-primary rounded-lg"}
      `}
    >
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="border border-dashed border-border hover:border-primary rounded-lg p-4 transition-colors cursor-pointer">
        <div className={`gap-4`}>
          {childBlocks.length === 0 ? (
            <Placeholder />
          ) : (
            <div>children nodes</div>
          )}
        </div>
      </div>
      {!isBlock && (
        <div className="flex justify-end px-2 py-1 gap-1">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              deleteBlock(blockInstance.id);
            }}
          >
            <Trash2 className="w-2 h-2" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              copyBlock(blockInstance.id);
            }}
          >
            <Copy className="w-2 h-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
function RowLayoutFormComponent() {
  return <div>asdf</div>;
}
function RowLayoutPropertiesComponent() {
  return <div>asdf</div>;
}

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
