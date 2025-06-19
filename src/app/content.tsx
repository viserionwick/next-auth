"use client"

// Essentials
import { NextPage } from "next";

// Lib
import logOut from "@/lib/auth/logOut";

const CONTENT: NextPage = () => {
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