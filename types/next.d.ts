import type { KindeAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import "next/server";

declare module "next/server" {
  interface NextRequest {
    kindeAuth?: KindeAuth;
  }
}
