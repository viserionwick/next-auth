"use client"

// Essentials
import { NextPage } from "next";

// Types
import { Session } from "next-auth";

// Utils
import { hasAccess } from "@/utils/auth/checkAccess";

interface PROPS {
    session: Session;
}

const CONTENT: NextPage<PROPS> = ({ session }) => {
    return (
        <div className="p-Users">
            <table className="min-w-full border border-gray-200 mt-4">
                <thead>
                    <tr className="bg-gray-100">
                        {
                            hasAccess(session, "assign:roles")
                            && <th className="px-4 py-2 border-b text-left">Action</th>
                        }
                        <th className="px-4 py-2 border-b text-left">Name</th>
                        <th className="px-4 py-2 border-b text-left">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { name: "Alice Smith", email: "alice@example.com" },
                        { name: "Bob Johnson", email: "bob@example.com" },
                        { name: "Charlie Brown", email: "charlie@example.com" }
                    ].map((user, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            {
                                hasAccess(session, "assign:roles")
                                && <td className="px-4 py-2 border-b">
                                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                                        Assign Role
                                    </button>
                                </td>
                            }
                            <td className="px-4 py-2 border-b">{user.name}</td>
                            <td className="px-4 py-2 border-b">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CONTENT;