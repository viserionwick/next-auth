// Essentials
import NextAuth, { Session } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

// Utils
import { serverEnv } from "@/utils/env/serverEnv";
import { clientEnv } from "@/utils/env/clientEnv";

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: clientEnv.AUTH0_CLIENT_ID,
      clientSecret: serverEnv.AUTH0_CLIENT_SECRET,
      issuer: clientEnv.AUTH0_ISSUER,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, profile }) {
      const auth0Profile: {
        "https://dev-yrfuxkn3fz3sw3pz.eu.auth0.com/claims/roles": string[],
        nickname: string,
        name: string,
        picture: string,
        updated_at: string,
        email: string,
        email_verified: boolean,
        iss: string,
        aud: string,
        sub: string,
      } | undefined = profile as any;

      token.role = auth0Profile?.["https://dev-yrfuxkn3fz3sw3pz.eu.auth0.com/claims/roles"]?.[0] || "user";
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const newSession = session as Session & { role: string };
        newSession.role = token.role as string || "user";
        return newSession;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };