import NextAuth from "next-auth";

declare module "next-auth" {
    interface Profile {
        [key: string]: string[];
    }

    interface Session {
        role: string;
    }

    interface JWT {
        role: string;
    }
}