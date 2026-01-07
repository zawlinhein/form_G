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
import { Switch } from "../ui/switch";
import { useBuilder } from "@/context/builder-provider";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "TextInput";

const TextInputPropertiesSchema = z.object({
  required: z.boolean(),
  label: z.string().min(3),
  placeholder: z.string().min(3),
});

type TextInputPropertiesType = z.infer<typeof TextInputPropertiesSchema>;

type TextInputBlockInstance = FormBlockInstance & {
  properties: TextInputPropertiesType;
};

export const TextInputBlock: FormBlock = {
  blockCategory,
  blockType,

  createFormBlockInstance: (id: string) => ({
    id,
    blockType,
    isLocked: false,
    properties: {
      required: false,
      label: "TextInput",
      placeholder: "TextInput",
    },
  }),

  blockBtnElement: {
    icon: TextCursorInput,
    label: "Text Input",
  },

  canvasComponent: TextInputCanvasComponent,
  formComponent: TextInputFormComponent,
  propertiesComponent: TextInputPropertiesComponent,
};

export function TextInputCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const { id, properties } = blockInstance as TextInputBlockInstance;
  const { label, placeholder, required } = properties;
  return (
    <div className="cursor-pointer flex flex-row items-center gap-3 border border-border rounded-lg p-4">
      <label className="block font-medium text-foreground" htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <Input
        disabled
        id={id}
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
export function TextInputFormComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const { id, properties } = blockInstance as TextInputBlockInstance;
  const { label, placeholder, required } = properties;
  return (
    <div className="cursor-pointer flex flex-row items-center gap-3 border border-border rounded-lg p-4">
      <label className="block font-medium text-foreground" htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <Input
        id={id}
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export function TextInputPropertiesComponent({
  blockInstance,
  parentId,
}: {
  blockInstance: FormBlockInstance;
  parentId?: string;
}) {
  const { updateChildBlockProperties } = useBuilder();
  const { id, properties } = blockInstance as TextInputBlockInstance;
  const form = useForm<TextInputPropertiesType>({
    resolver: zodResolver(TextInputPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: properties.label,
      required: properties.required,
      placeholder: properties.placeholder,
    },
  });

  const setChanges = (value: TextInputPropertiesType) => {
    if (!parentId) return;
    const updatedChildBlock = { ...blockInstance, properties: value };
    updateChildBlockProperties(parentId, blockInstance.id, updatedChildBlock);
  };
  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
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
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
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
          name="required"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(e) => {
                    field.onChange(e), setChanges({ ...form.getValues() });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
