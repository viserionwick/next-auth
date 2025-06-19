"use client"

// Essentials
import { NextPage } from "next";

// Lib
import logIn from "@/lib/auth/logIn";

const CONTENT: NextPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#e0e7ef] to-[#f1f5f9] px-4 py-10">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-10 flex flex-col items-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">Sign in to NextAuth</h1>
                <button
                    onClick={logIn}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition mb-2 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                    Sign in with Auth0
                </button>
            </div>
            <div className="w-full max-w-md bg-white/90 backdrop-blur-lg border border-blue-200 rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-blue-700 mb-4">Test users with roles</h2>
                <ul className="mb-4 space-y-1">
                    <li className="flex items-center gap-2"><span className="font-semibold text-gray-800">Admin:</span> <span className="font-mono text-gray-600">admin@email.com</span></li>
                    <li className="flex items-center gap-2"><span className="font-semibold text-gray-800">Editor:</span> <span className="font-mono text-gray-600">editor@email.com</span></li>
                    <li className="flex items-center gap-2"><span className="font-semibold text-gray-800">User:</span> <span className="font-mono text-gray-600">user@email.com</span></li>
                </ul>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">Password:</span>
                    <span className="font-mono text-gray-600">123456789.aA</span>
                </div>
            </div>
        </div>
    )
}

export default CONTENT;