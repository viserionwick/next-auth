// Essentials
import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";

// Utils
import { hasAccess } from "@/utils/auth/checkAccess";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const session = await getServerSession(authOptions);
    const role = session!.role;
    return (
        <div className="l-Dashboard">
            <div className="l-Dashboard--menu">
                {
                    hasAccess(role, "read:users")
                    && <Link href="/dashboard/users">Users</Link>
                }
                <br />
                <br />
                <Link href="/dashboard/posts">Posts</Link>
            </div>
            <div className="l-Dashboard--content">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;