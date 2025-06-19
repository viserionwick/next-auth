// Essentials
import z from "zod";

const serverEnvSchema = z.object({
    // NextAuth
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),

    // Auth0
    AUTH0_CLIENT_SECRET: z.string().min(1),
})

export const serverEnv = serverEnvSchema.parse({
    // NextAuth
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    // Auth0
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
});