import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Profile {
        [key: string]: string[];
    }

    interface Session {
        user: {
            role: string;
        } & DefaultSession["user"];
    }
}