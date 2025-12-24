"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useActionState, useState } from "react";
import { ActionResponse, createForm } from "@/actions/form.action";
import { Form } from "@/database/schema";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

const CreateForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    ActionResponse<Form>,
    FormData
  >(async (prevState: ActionResponse<Form>, formData: FormData) => {
    const result = await createForm(formData);
    if (result.success) {
      router.push(`/dashboard/form/builder/${result.data?.id}`);
      setIsOpen(false);
    }
    return result;
  }, initialState);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30">
          <Plus className="h-4 w-4 mr-2" />
          Create a form
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-card border-border p-6 sm:p-8">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-foreground text-2xl">
            Create New Form
          </SheetTitle>
          <SheetDescription className="text-muted-foreground mt-2">
            Fill in the details below to create a new form for your account.
          </SheetDescription>
          {state.message && (
            <SheetDescription className="text-destructive mt-2">
              {state.message}
            </SheetDescription>
          )}
        </SheetHeader>

        <form action={formAction} className="space-y-6">
          {/* Form Name Input */}
          <div className="space-y-3">
            <label
              htmlFor="form-name"
              className="text-sm font-medium text-foreground block"
            >
              Form Name <span className="text-destructive">*</span>
            </label>
            <input
              id="form-name"
              name="name"
              type="text"
              placeholder="e.g., Customer Survey"
              required
              disabled={isPending}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2",
                !state.success && state.errors
                  ? "border-destructive focus:ring-destructive"
                  : "border-border focus:ring-primary"
              )}
            />
            {!state.success && state.errors && (
              <p className="text-sm text-destructive">{state.errors.name}</p>
            )}
          </div>

          {/* Form Description Input */}
          <div className="space-y-3">
            <label
              htmlFor="form-description"
              className="text-sm font-medium text-foreground block"
            >
              Description
            </label>
            <textarea
              id="form-description"
              name="description"
              placeholder="Provide a brief description of what this form is for..."
              rows={4}
              disabled={isPending}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <Button
              disabled={isPending}
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
            >
              Create Form
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateForm;
