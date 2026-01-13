import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Skeleton } from "@/components/ui/skeleton";

const HeaderProfileSkeleton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 hover:bg-muted rounded-lg px-3 py-2 transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              <Skeleton className="h-8 w-8 rounded-full bg-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <Skeleton className="h-4 w-20 bg-muted-foreground" />
            <Skeleton className="h-3 w-24 bg-muted-foreground" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <LogoutLink>Logout</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderProfileSkeleton;
