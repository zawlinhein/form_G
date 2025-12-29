import { FormBlock } from "@/types/form.blocks.types";
import { cn } from "@/lib/utils";

type BlockBtnProps = {
  formBlock: FormBlock;
};

const BlockBtnOverlay = ({ formBlock }: BlockBtnProps) => {
  const { icon: Icon, label } = formBlock.blockBtnElement;
  return (
    <button
      className={cn(
        `flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-accent-foreground/20 transition-all hover:shadow-md`
      )}
    >
      <Icon className="w-5 h-5 text-muted-foreground" />
      <span className="text-xs font-medium text-center">{label}</span>
    </button>
  );
};

export default BlockBtnOverlay;
