import { db } from "@/database/db";
import { forms } from "@/database/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return new Response("Unauthorized User!", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const formId = searchParams.get("formId");

    if (!formId) {
      return new Response("Form ID is required", { status: 400 });
    }

    const form = await db.query.forms.findFirst({
      where: and(eq(forms.id, formId), eq(forms.userId, user.id)),
      with: { setting: true },
    });
    if (!form) {
      return new Response("Form not found", { status: 404 });
    }
    return NextResponse.json({ data: form });
  } catch (error) {
    console.error("Error in GET /api/form:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
