"use client"

// Essentials
import { NextPage } from "next";

// Types
import { Session } from "next-auth";

// Lib
import logOut from "@/lib/auth/logOut";
import { hasAccess } from "@/utils/auth/checkAccess";
import Link from "next/link";

const dummyPosts = [
    {
        title: "How to Use Next.js with Auth0",
        excerpt: "A step-by-step guide to integrating Auth0 authentication in your Next.js app.",
        author: "Jane Doe",
        date: "2024-06-01",
    },
    {
        title: "Understanding Server Components",
        excerpt: "Learn the difference between server and client components in Next.js 13+.",
        author: "John Smith",
        date: "2024-05-28",
    },
    {
        title: "Styling in Next.js with Tailwind",
        excerpt: "Tips and tricks for using Tailwind CSS effectively in your Next.js projects.",
        author: "Alex Lee",
        date: "2024-05-20",
    },
];

interface PROPS {
    session: Session
}

const CONTENT: NextPage<PROPS> = ({ session }) => {
    return (
        <div className="p-Home">
            <header className="sticky top-0 z-20 flex items-center justify-between mb-12 px-8 py-6 max-w-5xl mx-auto rounded-2xl shadow-xl bg-white/70 backdrop-blur-lg border border-gray-200 mt-[30px]">
                <div className="flex items-center gap-4">
                    <span className="text-2xl font-extrabold text-gray-900 tracking-tight">NextAuth</span>
                    {hasAccess(session, "read:dashboard") && (
                        <Link
                            href="/dashboard"
                            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
                <button
                    onClick={logOut}
                    className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow hover:from-red-600 hover:to-pink-600 transition cursor-pointer"
                >
                    Sign Out
                </button>
            </header>
            <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 tracking-tight drop-shadow-sm">Latest Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {dummyPosts.map((post, index) => (
                    <div
                        key={index}
                        className="group bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-8 flex flex-col justify-between transition-all duration-200 hover:scale-[1.025] hover:shadow-2xl hover:bg-white/90 cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30"></div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">{post.title}</h2>
                            <p className="text-gray-600 mb-6 text-base leading-relaxed">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                            <span className="font-medium text-gray-700">By {post.author}</span>
                            <span className="font-mono">{post.date}</span>
                        </div>
                    </div>
                ))}
            </div>
            <footer className="mt-20 text-center text-gray-400 text-sm pb-6">
                &copy; {new Date().getFullYear()} NextAuth.
            </footer>
        </div>
    )
}

export default CONTENT;