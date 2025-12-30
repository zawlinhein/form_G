import React from "react";

export type FormCategoryType = "Layout" | "Field";

export type FormBlockType = "RowLayout";

export type FormBlock = {
  blockCategory: FormCategoryType;
  blockType: FormBlockType;

  createFormBlockInstance: (id: string) => FormBlockInstance;

  blockBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  canvasComponent: React.FC<{ blockInstance: FormBlockInstance }>;
  formComponent: React.FC;
  propertiesComponent: React.FC;
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
