// Essentials
import { Metadata } from "next";

// Components
import CONTENT from "./content";

// Utils
import { generateServerSEO } from "@/utils/generateServerSEO";

export async function generateMetadata(): Promise<Metadata> {
  return await generateServerSEO({
    title: "Dashboard",
    description: "Welcome to admin dashboard.",
    route: "/dashboard",
  });
}

const DASHBOARD = async () => {
  return <CONTENT />
}

export default DASHBOARD;