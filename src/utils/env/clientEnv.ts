// Essentials
import z from "zod";

const clientEnvSchema = z.object({
    DEPLOYED_URL: z.string().min(1),

    // Auth0
    AUTH0_CLIENT_ID: z.string().min(1),
    AUTH0_ISSUER: z.string().min(1),
})

export const clientEnv = clientEnvSchema.parse({
    DEPLOYED_URL: process.env.NEXT_PUBLIC_DEPLOYED_URL,

    // Auth0
    AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    AUTH0_ISSUER: process.env.NEXT_PUBLIC_AUTH0_ISSUER,
});