import {
  FormBlock,
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  FormValues,
  useFormProps,
} from "@/types/form.blocks.types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Circle, GripVertical, Plus, Settings, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useFieldArray, useForm, UseFormRegister } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBuilder } from "@/context/builder-provider";
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "RadioSelect";

const RadioPropertiesSchema = z.object({
  label: z.string().min(3),
  options: z.array(z.string().min(1)),
  required: z.boolean(),
});

type RadioPropertiesSchemaType = z.infer<typeof RadioPropertiesSchema>;

type Properties = {
  label: string;
  options: string[];
  required: boolean;
};

type RadioBlockInstance = FormBlockInstance & { properties: Properties };

export const RadioSelectBlock: FormBlock = {
  blockCategory,
  blockType,

  createFormBlockInstance: (id: string) => ({
    id,
    blockType,
    isLocked: false,
    properties: {
      options: ["options1", "options2"],
      required: false,
      label: "Select One.",
    },
  }),

  blockBtnElement: {
    icon: Circle,
    label: "Radio Select",
  },

  canvasComponent: RadioSelectCanvasComponent,
  formComponent: RadioSelectFormComponent,
  propertiesComponent: RadioSelectPropertiesComponent,
};

function RadioSelectCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const radioBlockInstance = blockInstance as RadioBlockInstance;
  const { label, options, required } =
    radioBlockInstance.properties as Properties;
  return (
    <div className="group relative cursor-pointer">
      <div className="space-y-3 border border-border rounded-lg p-4 transition-colors ">
        <label className="block font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        <div className="space-y-3">
          <RadioGroup disabled>
            {options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <label
                  key={idx}
                  className="flex items-center gap-3"
                  htmlFor={option}
                >
                  <span className="text-foreground">{option}</span>
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

function RadioSelectFormComponent({
  blockInstance,
  useFormProps,
}: {
  blockInstance: FormBlockInstance;
  useFormProps?: useFormProps;
}) {
  const { id, properties } = blockInstance as RadioBlockInstance;
  const { label, required, options } = properties;
  return (
    <div className={"group relative"}>
      <div className="space-y-3 border border-border rounded-lg p-4 transition-colors ">
        <label className="block font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        <div className="space-y-3">
          <RadioGroup
            onValueChange={(value) =>
              useFormProps &&
              useFormProps.setValue(id, value, { shouldDirty: true })
            }
          >
            {options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option}
                  id={`form-${option}`}
                  className="cursor-pointer"
                />
                <label
                  key={idx}
                  className="flex items-center gap-3 cursor-pointer"
                  htmlFor={`form-${option}`}
                >
                  <span className="text-foreground">{option}</span>
                </label>
              </div>
            ))}
          </RadioGroup>
          {useFormProps && useFormProps.errors && useFormProps.errors[id] && (
            <p className="text-destructive mt-1 text-sm">
              {useFormProps.errors[id]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function RadioSelectPropertiesComponent({
  blockInstance,
  parentId,
}: {
  blockInstance: FormBlockInstance;
  parentId?: string;
}) {
  const { updateChildBlockProperties } = useBuilder();
  const { properties } = blockInstance as RadioBlockInstance;
  const form = useForm<RadioPropertiesSchemaType>({
    resolver: zodResolver(RadioPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: properties.label,
      options: properties.options || [],
      required: properties.required,
    },
  });

  const { fields, append, remove } = useFieldArray({
    // @ts-expect-error
    name: "options",
    control: form.control,
  });

  const setChanges = (value: RadioPropertiesSchemaType) => {
    if (!parentId) return;
    const updatedChildBlock = { ...blockInstance, properties: value };
    updateChildBlockProperties(parentId, blockInstance.id, updatedChildBlock);
  };

  useEffect(() => {
    form.reset({
      label: properties.label,
      options: properties.options || [],
      required: properties.required,
    });
  }, [blockInstance.id, form]);

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
        <FormItem>
          <FormLabel>Options</FormLabel>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`options.${index}`}
                render={({ field }) => (
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setChanges({ ...form.getValues() });
                      }}
                    />
                  </FormControl>
                )}
              />
            ))}
          </div>

          <FormMessage />
        </FormItem>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              append("New Option.");
              setChanges({ ...form.getValues() });
            }}
          >
            Add option
          </Button>

          {fields.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                remove(fields.length - 1);
                setChanges({ ...form.getValues() });
              }}
            >
              Remove
            </Button>
          )}
        </div>
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
