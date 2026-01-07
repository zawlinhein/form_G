import { RadioSelectBlock } from "@/components/blocks/RadioSelect";
import { RowLayoutBlock } from "@/components/blocks/RowLayout";
import { TextInputBlock } from "@/components/blocks/TextInput";
import { FormBlocksTypes } from "@/types/form.blocks.types";

export const formBlocks: FormBlocksTypes = {
  RowLayout: RowLayoutBlock,
  RadioSelect: RadioSelectBlock,
  TextInput: TextInputBlock,
};
