"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, MessageSquare, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { deleteFormById } from "@/actions/form.action";
import { toast } from "sonner";

export type FormItemProps = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  responses: number;
};

const FormItem = ({
  id,
  name,
  description,
  createdAt,
  responses,
}: FormItemProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onClick = useCallback(() => {
    router.push(`/dashboard/form/${id}/builder`);
  }, []);
  const onResponseClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push(`/dashboard/form/${id}/response`);
  }, []);

  const onDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    startTransition(async () => {
      try {
        const res = await deleteFormById(id);
        if (res.success) {
          toast.success("Form deleted successfully");
          router.refresh();
        } else {
          toast.error("Failed to delete form: " + res.message);
        }
      } catch (e) {
        toast.error("Failed to delete form");
      }
    });
  };
  return (
    <Card
      className="group bg-card/80 backdrop-blur-sm border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Form Preview */}
        <div className="bg-gradient-to-br from-muted to-secondary/50 p-8 border-b border-border relative">
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 hover:bg-card"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onResponseClick}>
                  Response
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={onDelete}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <div className="h-3 w-24 bg-muted rounded"></div>

            <div className="space-y-2">
              <div className="h-2 w-full bg-muted/50 rounded"></div>
              <div className="h-2 w-3/4 bg-muted/50 rounded"></div>
              <div className="h-2 w-5/6 bg-muted/50 rounded"></div>
            </div>
          </div>
        </div>

        {/* Form Info */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-3 text-balance">
            {name}
          </h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {description ? description : ""}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                {responses}
              </span>
            </div>
            <span className="text-xs">{format(createdAt, "dd MM yyyy")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormItem;
