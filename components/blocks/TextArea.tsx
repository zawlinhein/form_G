import {
  FormBlock,
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  useFormProps,
} from "@/types/form.blocks.types";
import { TextAlignCenter } from "lucide-react";
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
import { Textarea } from "../ui/textarea";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "TextArea";

const TextAreaPropertiesSchema = z.object({
  required: z.boolean(),
  label: z.string().min(3),
  placeholder: z.string().min(3),
});

type TextAreaPropertiesType = z.infer<typeof TextAreaPropertiesSchema>;

type TextAreaBlockInstance = FormBlockInstance & {
  properties: TextAreaPropertiesType;
};

export const TextAreaBlock: FormBlock = {
  blockCategory,
  blockType,

  createFormBlockInstance: (id: string) => ({
    id,
    blockType,
    isLocked: false,
    properties: {
      required: false,
      label: "TextArea",
      placeholder: "TextArea",
    },
  }),

  blockBtnElement: {
    icon: TextAlignCenter,
    label: "Text Area",
  },

  canvasComponent: TextAreaCanvasComponent,
  formComponent: TextAreaFormComponent,
  propertiesComponent: TextAreaPropertiesComponent,
};

export function TextAreaCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const { id, properties } = blockInstance as TextAreaBlockInstance;
  const { label, placeholder, required } = properties;
  return (
    <div className="cursor-pointer flex flex-row items-center gap-3 border border-border rounded-lg p-4">
      <label className="block font-medium text-foreground" htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <Textarea
        disabled
        id={id}
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
export function TextAreaFormComponent({
  blockInstance,
  useFormProps,
}: {
  blockInstance: FormBlockInstance;
  useFormProps?: useFormProps;
}) {
  const { id, properties } = blockInstance as TextAreaBlockInstance;
  const { label, placeholder, required } = properties;
  return (
    <div className="cursor-pointer  gap-3 border border-border rounded-lg p-4">
      <div className="flex flex-row items-center gap-3">
        {" "}
        <label className="block font-medium text-foreground" htmlFor={id}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        <Textarea
          id={id}
          placeholder={placeholder}
          onClick={(e) => e.stopPropagation()}
          {...(useFormProps && useFormProps.register(id))}
        />
      </div>
      {useFormProps && useFormProps.errors && useFormProps.errors[id] && (
        <p className="text-destructive mt-1 text-sm">
          {useFormProps.errors[id]}
        </p>
      )}
    </div>
  );
}

export function TextAreaPropertiesComponent({
  blockInstance,
  parentId,
}: {
  blockInstance: FormBlockInstance;
  parentId?: string;
}) {
  const { updateChildBlockProperties } = useBuilder();
  const { id, properties } = blockInstance as TextAreaBlockInstance;
  const form = useForm<TextAreaPropertiesType>({
    resolver: zodResolver(TextAreaPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: properties.label,
      required: properties.required,
      placeholder: properties.placeholder,
    },
  });

  const setChanges = (value: TextAreaPropertiesType) => {
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
