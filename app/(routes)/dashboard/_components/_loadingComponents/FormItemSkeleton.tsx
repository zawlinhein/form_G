import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FileText, MessageSquare, MoreHorizontal } from "lucide-react";

const FormItemSkeleton = () => {
  return (
    <Card className="group bg-card/80 backdrop-blur-sm border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden">
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
                <DropdownMenuItem>Response</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
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
            <Skeleton className="h-6 w-32 bg-muted-foreground" />
          </h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <Skeleton className="h-4 w-32 bg-muted-foreground" />
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                <Skeleton className="h-4 w-8 bg-muted-foreground" />
              </span>
            </div>
            <span className="text-xs">
              <Skeleton className="h-4 w-20 bg-muted-foreground" />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormItemSkeleton;
