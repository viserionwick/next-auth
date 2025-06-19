// Essentials
import { Metadata } from "next";
import { getServerSession, Session } from "next-auth";

// Components
import CONTENT from "./content";

// Utils
import { generateServerSEO } from "@/utils/generateServerSEO";
import { authOptions } from "./api/auth/[...nextauth]/route";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    description: "Welcome to NextAuth.",
    route: "/",
  });
}

const ROOT = async () => {
  const session = await getServerSession(authOptions) as NonNullable<Session>;
  return <CONTENT session={session} />
}

export default ROOT;
