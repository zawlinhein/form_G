import { formBlocks } from "@/lib/blocks";
import { FormBlockInstance } from "@/types/form.blocks.types";

type CanvasComponentWrapperPorps = {
  blockInstance: FormBlockInstance;
};

const CanvasComponentWrapper = ({
  blockInstance,
}: CanvasComponentWrapperPorps) => {
  const CanvasComponent = formBlocks[blockInstance.blockType].canvasComponent;
  return (
    <div>
      <CanvasComponent blockInstance={blockInstance} />
    </div>
  );
};

export default CanvasComponentWrapper;
