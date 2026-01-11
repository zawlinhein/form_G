import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeaderProfile from "./HeaderProfile";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href={"/dashboard"}>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    F
                  </span>
                </div>
                <span className="text-xl font-semibold text-foreground">
                  Form-G
                </span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                className="text-foreground font-medium bg-muted"
              >
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
              <Button variant="ghost" className="text-muted-foreground">
                <Link href={"/builder"}>Builder</Link>
              </Button>
              <Button variant="ghost" className="text-muted-foreground">
                <Link href={"/reponse"}>Reponse</Link>
              </Button>
              <Button variant="ghost" className="text-muted-foreground">
                <Link href={"/setting"}>Setting</Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Suspense fallback={<div>Loading...</div>}>
              <HeaderProfile />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
