import { DefaultSession, DefaultUser } from "next-auth";
import { User } from "@/app/lib/definitions";

declare module "next-auth" {
  interface Session {
    user: User & {
      role: string;
    };
  }

  interface User extends DefaultUser {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User & {
      role: string;
    };
  }
}
