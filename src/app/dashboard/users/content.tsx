"use client"

// Essentials
import { NextPage } from "next";

// Types
import { Session } from "next-auth";

// Utils
import { hasAccess } from "@/utils/auth/checkAccess";

const users = [
    { name: "Alice Smith", email: "alice@example.com" },
    { name: "Bob Johnson", email: "bob@example.com" },
    { name: "Charlie Brown", email: "charlie@example.com" }
];

interface PROPS {
    session: Session;
}

const CONTENT: NextPage<PROPS> = ({ session }) => {
    const showActionButtons = hasAccess(session, "assign:roles");

    return (
        <div>
            <h1 className="text-3xl font-bold mb-10 text-center text-gray-900 tracking-tight drop-shadow-sm">Users</h1>
            <div className="mb-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded text-left">
                Only roles with <span className="font-semibold">&quot;assign:roles&quot;</span> permission (Admin, Moderator) can see the <span className="font-semibold">&quot;Assign Role&quot;</span> buttons.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className="group bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-2xl hover:bg-white/90 cursor-default relative overflow-hidden"
                    >
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                                {user.name}
                            </h2>
                            <p className="text-gray-600 mb-4 text-base leading-relaxed">
                                {user.email}
                            </p>
                        </div>
                        {
                            showActionButtons &&
                            <button className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition self-end cursor-pointer">
                                Assign Role
                            </button>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CONTENT;