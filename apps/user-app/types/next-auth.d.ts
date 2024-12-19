import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      number?: string;
      authType: AuthType;
    }
  }
}

enum AuthType {
    Google = "Google",
    Github = "Github",
    Phone = "Phone"
}

