import {
  FormBlock,
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  FormValues,
  useFormProps,
} from "@/types/form.blocks.types";
import { Star } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import { Rating as InteractiveRating } from "../ui/Rating";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "../ui/switch";
import { useBuilder } from "@/context/builder-provider";
import { Input } from "../ui/input";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "Rating";

const RatingPropertiesSchema = z.object({
  required: z.boolean(),
  label: z.string().min(3),
});

type RatingPropertiesType = z.infer<typeof RatingPropertiesSchema>;

type RatingBlockInstance = FormBlockInstance & {
  properties: RatingPropertiesType;
};

export const RatingBlock: FormBlock = {
  blockCategory,
  blockType,

  createFormBlockInstance: (id: string) => ({
    id,
    blockType,
    isLocked: false,
    properties: {
      required: false,
      label: "Rating",
    },
  }),

  blockBtnElement: {
    icon: Star,
    label: "Rating",
  },

  canvasComponent: RatingCanvasComponent,
  formComponent: RatingFormComponent,
  propertiesComponent: RatingPropertiesComponent,
};

export function RatingCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const { id, properties } = blockInstance as RatingBlockInstance;
  const { label, required } = properties;
  return (
    <div className="cursor-pointer flex flex-row items-center gap-3 border border-border rounded-lg p-4">
      <label className="block font-medium text-foreground" htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <Rating style={{ maxWidth: 100 }} isDisabled={true} id={id} value={1} />
    </div>
  );
}
export function RatingFormComponent({
  blockInstance,
  useFormProps,
}: {
  blockInstance: FormBlockInstance;
  useFormProps?: useFormProps;
}) {
  const { id, properties } = blockInstance as RatingBlockInstance;
  const { label, required } = properties;
  return (
    <div className="cursor-pointer gap-3 border border-border rounded-lg p-4">
      <div className="flex flex-row items-center gap-3">
        <label className="block font-medium text-foreground" htmlFor={id}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        <InteractiveRating useFormProps={useFormProps} id={id} />
      </div>
      {useFormProps && useFormProps.errors && useFormProps.errors[id] && (
        <p className="text-destructive mt-1 text-sm">
          {useFormProps.errors[id]}
        </p>
      )}
    </div>
  );
}

export function RatingPropertiesComponent({
  blockInstance,
  parentId,
}: {
  blockInstance: FormBlockInstance;
  parentId?: string;
}) {
  const { updateChildBlockProperties } = useBuilder();
  const { id, properties } = blockInstance as RatingBlockInstance;
  const form = useForm<RatingPropertiesType>({
    resolver: zodResolver(RatingPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: properties.label,
      required: properties.required,
    },
  });

  const setChanges = (value: RatingPropertiesType) => {
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
