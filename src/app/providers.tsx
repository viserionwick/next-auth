"use client"

// Contexts
import { SessionProvider } from "next-auth/react";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AllProviders;