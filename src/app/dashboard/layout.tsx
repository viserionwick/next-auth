// Essentials
import React, { ReactNode } from "react";
import { getServerSession, Session } from "next-auth";

// Utils
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Components
import DashboardLayoutClient from "./clientLayout";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const session = await getServerSession(authOptions) as NonNullable<Session>;
    return <DashboardLayoutClient session={session}>
        {children}
    </DashboardLayoutClient>;
};

export default DashboardLayout;