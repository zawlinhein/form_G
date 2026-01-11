"use server";
import { db } from "@/database/db";
import {
  Form,
  FormResponse,
  formResponses,
  forms,
  formSettings,
} from "@/database/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { count, eq, sum, gt, and } from "drizzle-orm";
import { z } from "zod";

export type ActionResponse<T = undefined> =
  | {
      success: true;
      message?: string;
      data?: T;
    }
  | {
      success: false;
      message: string;
      errors?: Record<string, string[]>;
    };

export type FormStateData = {
  totalForms: number;
  totalResponses: number;
  conversionRate: number;
  engagementRate: number;
};

const createFormSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Form name must be at least 5 characters" })
    .max(50, { message: "Form name must be less than 50 characters" }),
  description: z
    .string()
    .max(100, { message: "Description must be less than 100 characters" })
    .optional(),
});

export const fetchFormStateByUser = async (): Promise<
  ActionResponse<FormStateData>
> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    const [{ totalViews, totalResponses, totalForms }] = await db
      .select({
        totalViews: sum(forms.views),
        totalResponses: sum(forms.responses),
        totalForms: count(forms.id),
      })
      .from(forms)
      .where(eq(forms.userId, user.id));
    const [{ formCountWithResponses }] = await db
      .select({
        formCountWithResponses: count(forms.id),
      })
      .from(forms)
      .where(and(eq(forms.userId, user.id), gt(forms.responses, 0)));
    const conversionRate = Number(totalResponses)
      ? (Number(totalResponses) / Number(totalViews)) * 100
      : 0;
    const engagementRate = formCountWithResponses
      ? (formCountWithResponses / totalForms) * 100
      : 0;
    return {
      success: true,
      message: "Form state fetched successfully",
      data: {
        totalForms,
        totalResponses: Number(totalResponses),
        conversionRate,
        engagementRate,
      },
    };
  } catch (error) {
    console.error("Error fetching form state:", error);
    return {
      success: false,
      message: "An unexpected error occurred while fetching form state.",
    };
  }
};

export const createForm = async (
  formData: FormData
): Promise<ActionResponse<Form>> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    };

    //zod validation
    const parsedData = createFormSchema.safeParse(data);
    if (!parsedData.success) {
      return {
        success: false,
        message: "Validation errors occurred",
        errors: parsedData.error.flatten().fieldErrors,
      };
    }

    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    const [formSetting] = await db
      .insert(formSettings)
      .values({
        primaryColor: "#9B2C2C",
        backgroundColor: "#FAF7F5",
      })
      .returning();
    const [newForm] = await db
      .insert(forms)
      .values({
        userId: user.id,
        userName: user.given_name!,
        name: data.name,
        description: data.description || "",
        jsonBlock: "[]",
        settingId: formSetting.id,
      })
      .returning();
    return {
      success: true,
      message: "Form created successfully",
      data: newForm,
    };
  } catch (error) {
    console.error("Error creating form:", error);
    return {
      success: false,
      message: "An unexpected error occurred while creating the form.",
    };
  }
};

export const getAllFormsByUser = async (): Promise<ActionResponse<Form[]>> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    const userForms = await db.query.forms.findMany({
      where: eq(forms.userId, user.id),
      orderBy: (forms, { desc }) => [desc(forms.createdAt)],
    });
    return {
      success: true,
      message: "Forms fetched successfully",
      data: userForms,
    };
  } catch (error) {
    console.error("Error fetching forms:", error);
    return {
      success: false,
      message: "An unexpected error occurred while fetching forms.",
    };
  }
};

export const saveForm = async (data: {
  formId: string;
  jsonBlocks: string;
}): Promise<ActionResponse<Form>> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const { formId, jsonBlocks } = data;

    if (!formId || !jsonBlocks) {
      return {
        success: false,
        message: "Invalid data to save form.",
      };
    }

    const [updatedForm] = await db
      .update(forms)
      .set({
        jsonBlock: jsonBlocks,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(forms.id, formId),
          eq(forms.userId, user.id) // Ensure the user owns the form
        )
      )
      .returning();
    return {
      success: true,
      message: "Form saved successfully",
      data: updatedForm,
    };
  } catch (error) {
    console.error("Error creating form:", error);
    return {
      success: false,
      message: "An unexpected error occurred while creating the form.",
    };
  }
};

export const publishForm = async (data: {
  formId: string;
  published: boolean;
}): Promise<ActionResponse<Form>> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const { formId, published } = data;

    if (!formId) {
      return {
        success: false,
        message: "Invalid data to publish form.",
      };
    }

    const [updatedForm] = await db
      .update(forms)
      .set({
        published: published,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(forms.id, formId),
          eq(forms.userId, user.id) // Ensure the user owns the form
        )
      )
      .returning();
    return {
      success: true,
      message: "Form published successfully",
      data: updatedForm,
    };
  } catch (error) {
    console.error("Error publishing form:", error);
    return {
      success: false,
      message: "An unexpected error occurred while publishing the form.",
    };
  }
};

export const getPublicFormById = async (
  formId: string
): Promise<ActionResponse<Form>> => {
  try {
    if (!formId) {
      return {
        success: false,
        message: "Form ID is required.",
      };
    }

    const form = await db.query.forms.findFirst({
      where: and(eq(forms.id, formId), eq(forms.published, true)),
    });

    if (!form) {
      return {
        success: false,
        message: "Form not found or is not published.",
      };
    }

    return {
      success: true,
      message: "Form fetched successfully",
      data: form,
    };
  } catch (error) {
    console.error("Error fetching public form:", error);
    return {
      success: false,
      message: "An unexpected error occurred while fetching the form.",
    };
  }
};

export const saveResponse = async (data: {
  formId: string;
  responses: string;
}): Promise<ActionResponse> => {
  try {
    const { formId, responses } = data;

    if (!formId || !responses) {
      return {
        success: false,
        message: "Invalid data to save response.",
      };
    }

    const [response] = await db
      .insert(formResponses)
      .values({
        formId: formId,
        responseData: responses,
        createdAt: new Date(),
      })
      .returning();

    if (!response) {
      return {
        success: false,
        message: "Failed to save response.",
      };
    }
    return {
      success: true,
      message: "Response saved successfully",
    };
  } catch (error) {
    console.error("Error saving response:", error);
    return {
      success: false,
      message: "An unexpected error occurred while saving the response.",
    };
  }
};

export const getResponsesByFormId = async (
  formId: string
): Promise<ActionResponse<FormResponse[]>> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    if (!formId) {
      return {
        success: false,
        message: "Form ID is required.",
      };
    }

    const responses = await db.query.formResponses.findMany({
      where: eq(formResponses.formId, formId),
      orderBy: (formResponses, { desc }) => [desc(formResponses.createdAt)],
    });

    return {
      success: true,
      message: "Responses fetched successfully",
      data: responses,
    };
  } catch (error) {
    console.error("Error fetching responses:", error);
    return {
      success: false,
      message: "An unexpected error occurred while fetching responses.",
    };
  }
};
