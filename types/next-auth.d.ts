import "next-auth";

declare module "next-auth" {
  interface Session {
    userName?: string | null;
  }
}
