// Essentials
import { Metadata } from "next";

// Components
import CONTENT from "./content";

// Utils
import { generateServerSEO } from "@/utils/generateServerSEO";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Users",
    description: "All the users.",
    route: "/users"
  });
}

const USERS = async () => {
  return <CONTENT />
}

export default USERS;