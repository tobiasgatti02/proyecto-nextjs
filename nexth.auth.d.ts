import { DefaultSession, DefaultUser } from "next-auth";
import { User } from "@/app/lib/definitions";

// Extiende las interfaces de `next-auth`
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
