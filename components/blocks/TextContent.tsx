import {
  FormBlock,
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
} from "@/types/form.blocks.types";
import { TextCursorInput } from "lucide-react";
import { Input } from "../ui/input";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBuilder } from "@/context/builder-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "TextContent";

const FONT_SIZE = ["small", "medium", "large"] as const;

const FONT_WEIGHTS = ["normal", "semibold", "bold"] as const;

const textContentVarients = cva("", {
  variants: {
    size: {
      small: "text-sm",
      medium: "text-lg",
      large: "text-2xl",
    },
    weight: {
      normal: "font-normal",
      semibold: "font-medium",
      bold: "font-bold",
    },
  },
});

const TextContentPropertiesSchema = z.object({
  content: z.string().min(3).max(200),
  fontWeight: z.enum(FONT_WEIGHTS),
  fontSize: z.enum(FONT_SIZE),
});

type TextContentPropertiesType = z.infer<typeof TextContentPropertiesSchema>;

type TextContentBlockInstance = FormBlockInstance & {
  properties: TextContentPropertiesType;
};

export const TextContentBlock: FormBlock = {
  blockCategory,
  blockType,

  createFormBlockInstance: (id: string) => ({
    id,
    blockType,
    isLocked: false,
    properties: {
      content: "Content",
      fontSize: "medium",
      fontWeight: "normal",
    },
  }),

  blockBtnElement: {
    icon: TextCursorInput,
    label: "Text Input",
  },

  canvasComponent: TextContentCanvasComponent,
  formComponent: TextContentFormComponent,
  propertiesComponent: TextContentPropertiesComponent,
};

export function TextContentCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const { id, properties } = blockInstance as TextContentBlockInstance;
  const { content, fontSize, fontWeight } = properties;
  return (
    <div className="cursor-pointer flex flex-row items-center gap-3 border border-border rounded-lg p-4">
      <div
        className={cn(
          textContentVarients({ size: fontSize, weight: fontWeight })
        )}
      >
        {content}
      </div>
    </div>
  );
}
export function TextContentFormComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const { id, properties } = blockInstance as TextContentBlockInstance;
  const { content, fontSize, fontWeight } = properties;
  return (
    <div className="cursor-pointer flex flex-row items-center gap-3 border border-border rounded-lg p-4">
      <div
        className={cn(
          textContentVarients({ size: fontSize, weight: fontWeight })
        )}
      >
        {content}
      </div>
    </div>
  );
}

export function TextContentPropertiesComponent({
  blockInstance,
  parentId,
}: {
  blockInstance: FormBlockInstance;
  parentId?: string;
}) {
  const { updateChildBlockProperties } = useBuilder();
  const { id, properties } = blockInstance as TextContentBlockInstance;
  const form = useForm<TextContentPropertiesType>({
    resolver: zodResolver(TextContentPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      content: properties.content,
      fontWeight: properties.fontWeight,
      fontSize: properties.fontSize,
    },
  });

  const setChanges = (value: TextContentPropertiesType) => {
    if (!parentId) return;
    const updatedChildBlock = { ...blockInstance, properties: value };
    updateChildBlockProperties(parentId, blockInstance.id, updatedChildBlock);
  };
  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setChanges({ ...form.getValues() });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fontSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Size</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setChanges({ ...form.getValues() });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">small</SelectItem>
                    <SelectItem value="medium">medium</SelectItem>
                    <SelectItem value="large">large</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fontWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Weight</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setChanges({ ...form.getValues() });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">normal</SelectItem>
                    <SelectItem value="semibold">semibold</SelectItem>
                    <SelectItem value="bold">bold</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
