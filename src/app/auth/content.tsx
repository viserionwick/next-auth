"use client"

// Essentials
import { NextPage } from "next";
import { signIn } from "next-auth/react";

const CONTENT: NextPage = () => {
    return (
        <div className="p-Auth">
            <button
                onClick={() => signIn("auth0")}
                className="hover:cursor-pointer"
            >
                Sign in with Auth0
            </button>
        </div>
    )
}

export default CONTENT;