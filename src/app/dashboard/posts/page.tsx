// Essentials
import { Metadata } from "next";
import { getServerSession, Session } from "next-auth";

// Components
import CONTENT from "./content";

// Utils
import { generateServerSEO } from "@/utils/generateServerSEO";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Blog Posts",
    description: "All the blog posts.",
    route: "/posts"
  });
}

const POSTS = async () => {
  const session = await getServerSession(authOptions) as NonNullable<Session>;
  return <CONTENT session={session} />
}

export default POSTS;