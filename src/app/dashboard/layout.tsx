"use client"

// Essentials
import React, { ReactNode } from "react";
import Link from "next/link";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="l-Dashboard">
            <div className="l-Dashboard--menu">
                <Link href="/dashboard/users">Users</Link>
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