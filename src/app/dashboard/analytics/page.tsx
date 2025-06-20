// Essentials
import { Metadata } from "next";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

// Components
import CONTENT from "./content";

// Utils
import { generateServerSEO } from "@/utils/generateServerSEO";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { hasAccess } from "@/utils/auth/checkAccess";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Analytics",
    description: "All the analytics.",
    route: "/analytics"
  });
}

const ANALYTICS = async () => {
  const session = await getServerSession(authOptions) as NonNullable<Session>;
  if (hasAccess(session, "read:analytics"))
    return <CONTENT />
  else redirect("/dashboard")
}

export default ANALYTICS;