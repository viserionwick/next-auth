"use client"

// Essentials
import { NextPage } from "next";

// Lib
import logIn from "@/lib/auth/logIn";

const CONTENT: NextPage = () => {
    return (
        <div className="p-Auth">
            <button
                onClick={logIn}
                className="hover:cursor-pointer"
            >
                Sign in with Auth0
            </button>
        </div>
    )
}

export default CONTENT;