// Essentials
import { Metadata } from "next";

// Components
import CONTENT from "./content";

// Utils
import { generateServerSEO } from "@/utils/generateServerSEO";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Blog Posts",
    description: "All the blog posts.",
    route: "/posts"
  });
}

const POSTS = async () => {
  return <CONTENT />
}

export default POSTS;