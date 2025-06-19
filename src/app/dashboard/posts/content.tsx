"use client"

// Essentials
import { NextPage } from "next";

// Types
import { Session } from "next-auth";

// Utils
import { hasAccess } from "@/utils/auth/checkAccess";

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
    session: Session;
}

const CONTENT: NextPage<PROPS> = ({ session }) => {
    const showEditButton = hasAccess(session, "edit:blog_posts");

    return (
        <div>
            <h1 className="text-3xl font-bold mb-10 text-center text-gray-900 tracking-tight drop-shadow-sm">Blog Posts</h1>
            <div className="mb-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded text-left">
                Only roles with <span className="font-semibold">"edit:blog_posts"</span> permission (Admin, Editor) can see the <span className="font-semibold">"Edit"</span> buttons.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {dummyPosts.map((post, index) => (
                    <div
                        key={index}
                        className="group bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-2xl hover:bg-white/90 cursor-default relative overflow-hidden"
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
                        {
                            showEditButton &&
                            <button className="mt-6 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-500 transition self-end cursor-pointer">
                                Edit
                            </button>
                        }

                    </div>
                ))}
            </div>
        </div>
    )
}

export default CONTENT;