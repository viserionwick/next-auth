// Essentials
import React, { ReactNode } from "react";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";

// Utils
import { hasAccess } from "@/utils/auth/checkAccess";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const session = await getServerSession(authOptions) as NonNullable<Session>;
    return (
        <div className="l-Dashboard">
            <div className="l-Dashboard--menu">
                {
                    hasAccess(session, "read:users")
                    && <Link href="/dashboard/users">Users</Link>
                }
                <br />
                <br />
                {
                    hasAccess(session, "edit:blog_posts")
                    && <Link href="/dashboard/posts">Posts</Link>
                }
                <br />
                <br />
                {
                    hasAccess(session, "read:analytics")
                    && <Link href="/dashboard/analytics">Analytics</Link>
                }
            </div>
            <div className="l-Dashboard--content">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;