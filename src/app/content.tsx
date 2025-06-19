"use client"

// Essentials
import { NextPage } from "next";
import { signOut as nextAuthSignOut } from "next-auth/react";

// Utils
import { clientEnv } from "@/utils/env/clientEnv";

const CONTENT: NextPage = () => {
    const logOut = () => {
        nextAuthSignOut();
        window.location.href = `${clientEnv.AUTH0_ISSUER}/v2/logout?client_id=${clientEnv.AUTH0_CLIENT_ID}&returnTo=${clientEnv.DEPLOYED_URL}`;
    }

    return (
        <div className="p-Home">
            <button
                onClick={logOut}
                className="hover:cursor-pointer"
            >
                SIGN OUT
            </button>
        </div>
    )
}

export default CONTENT;