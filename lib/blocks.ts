import { RadioSelectBlock } from "@/components/blocks/RadioSelect";
import { RatingBlock } from "@/components/blocks/Rating";
import { RowLayoutBlock } from "@/components/blocks/RowLayout";
import { TextAreaBlock } from "@/components/blocks/TextArea";
import { TextContentBlock } from "@/components/blocks/TextContent";
import { TextInputBlock } from "@/components/blocks/TextInput";
import { FormBlocksTypes } from "@/types/form.blocks.types";

export const formBlocks: FormBlocksTypes = {
  RowLayout: RowLayoutBlock,
  RadioSelect: RadioSelectBlock,
  TextInput: TextInputBlock,
  TextArea: TextAreaBlock,
  Rating: RatingBlock,
  TextContent: TextContentBlock,
};
