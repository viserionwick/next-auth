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
      const roles = (profile as any)?.["http://localhost:3000/claims/roles"];
      if (profile && roles) {
        token.role = roles?.[0] || "user";
      }      
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