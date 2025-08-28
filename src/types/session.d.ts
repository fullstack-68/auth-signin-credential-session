import { type Details } from "express-useragent";
import { type LoginType } from "@src/auth/session.ts";
// https://stackoverflow.com/a/65805410

declare module "express-session" {
  interface SessionData {
    useragent?: Details;
    createdAt?: number;
    loginType: LoginType;
    passport?: { user: string };
  }
}

export {};
