// Essentials
import { Metadata } from "next";

// Components
import CONTENT from "./content";

// Utils
import { generateServerSEO } from "@/utils/generateServerSEO";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Sign In",
    description: "Sign In with Auth0",
    keywords: ["auth0"],
    route: "/auth"
  });
}

const SIGNUP = async () => {
  return <CONTENT />
}

export default SIGNUP;