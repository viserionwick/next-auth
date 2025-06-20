// Essentials
import { Metadata } from "next";
import { getServerSession, Session } from "next-auth";

// Components
import CONTENT from "./content";

// Utils
import { generateServerSEO } from "@/utils/generateServerSEO";
import { authOptions } from "@/lib/auth/nextauth";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Users",
    description: "All the users.",
    route: "/users"
  });
}

const USERS = async () => {
  const session = await getServerSession(authOptions) as NonNullable<Session>;
  return <CONTENT session={session}/>
}

export default USERS;