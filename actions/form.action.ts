"use server";
import { db } from "@/database/db";
import { Form, forms, formSettings } from "@/database/schema";
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
        jsonBlock: [],
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
