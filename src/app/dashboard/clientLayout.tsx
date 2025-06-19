"use client";

// Essentials
import React, { ReactNode, useState } from "react";
import Link from "next/link";

// Utils
import { hasAccess } from "@/utils/auth/checkAccess";

// Types
import { Session } from "next-auth";

interface PROPS {
    session: Session;
    children: ReactNode;
}

const DashboardLayoutClient: React.FC<PROPS> = ({ session, children }) => {
    const [openNav, setOpenNav] = useState(false);

    return (
        <div className="l-Dashboard flex flex-col md:flex-row min-h-screen">
            <div className="md:hidden fixed top-0 left-0 w-full z-30 flex justify-between items-center px-4 py-4">
                <Link
                    href="/dashboard"
                    className="bg-white/90 rounded-full p-2 shadow-lg flex items-center justify-center w-10 h-10 min-w-10 min-h-10"
                >
                    <span className="text-gray-700 font-bold text-lg">N</span>
                </Link>
                <button
                    className="bg-white/90 rounded-full p-2 shadow-lg"
                    onClick={() => setOpenNav(true)}
                >
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <nav
                className={`
                    fixed top-0 left-0 h-full w-full md:w-64 bg-white border-r border-gray-200 shadow-xl z-40
                    transform ${openNav ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200
                    md:translate-x-0 md:flex md:flex-col min-h-screen
                `}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 md:block">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                            onClick={() => setOpenNav(false)}
                        >
                            <span className="text-gray-700 font-bold text-lg">N</span>
                        </Link>
                        <Link
                            href="/"
                            className="px-4 py-2 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-700 transition text-sm"
                            onClick={() => setOpenNav(false)}
                        >
                            Website
                        </Link>
                    </div>
                    <button
                        onClick={() => setOpenNav(false)}
                        className="p-2 rounded transition md:hidden ml-4"
                    >
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-700">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col gap-1 px-4 py-3">
                    {
                        hasAccess(session, "read:users") &&
                        <Link
                            href="/dashboard/users"
                            className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition flex items-center text-sm font-medium"
                            onClick={() => setOpenNav(false)}
                        >
                            Users
                        </Link>
                    }
                    {
                        hasAccess(session, "edit:blog_posts") &&
                        <Link
                            href="/dashboard/posts"
                            className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition flex items-center text-sm font-medium"
                            onClick={() => setOpenNav(false)}
                        >
                            Posts
                        </Link>
                    }
                    {
                        hasAccess(session, "read:analytics") &&
                        <Link
                            href="/dashboard/analytics"
                            className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition flex items-center text-sm font-medium"
                            onClick={() => setOpenNav(false)}
                        >
                            Analytics
                        </Link>
                    }
                </div>
            </nav>

            {
                openNav &&
                <div
                    className="fixed inset-0 bg-black/30 z-30 md:hidden"
                    onClick={() => setOpenNav(false)}
                ></div>
            }

            <main className="l-Dashboard--content flex-1 px-4 py-6 md:pl-72 md:pr-12 md:py-10 mt-16 md:mt-0" >
                {children}
            </main>
        </div>
    );
}

export default DashboardLayoutClient;