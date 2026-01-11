import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

export type FormValues = Record<string, string>;
export type useFormProps = {
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  errors?: Record<string, string>;
};

export type FormCategoryType = "Layout" | "Field";

export type FormBlockType =
  | "RowLayout"
  | "RadioSelect"
  | "TextInput"
  | "TextArea"
  | "Rating"
  | "TextContent";

export type FormBlock = {
  blockCategory: FormCategoryType;
  blockType: FormBlockType;

  createFormBlockInstance: (id: string) => FormBlockInstance;

  blockBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  canvasComponent: React.FC<{ blockInstance: FormBlockInstance }>;
  formComponent: React.FC<{
    blockInstance: FormBlockInstance;
    useFormProps?: useFormProps;
  }>;
  propertiesComponent: React.FC<{
    blockInstance: FormBlockInstance;
    parentId?: string;
  }>;
};

export type FormBlockInstance = {
  id: string;
  blockType: FormBlockType;
  properties?: Record<string, any>;
  children?: FormBlockInstance[];
  isLocked: boolean;
};

export type FormBlocksTypes = {
  [key in FormBlockType]: FormBlock;
};
