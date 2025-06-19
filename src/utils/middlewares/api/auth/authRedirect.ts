// Essentials
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Utils
import { serverEnv } from "@/utils/env/serverEnv";

const authRedirect = async (req: NextRequest, redirectTo: string, checkOnline: boolean = true) => {
    const user = await getToken({ req, secret: serverEnv.NEXTAUTH_SECRET });    
    const host = req.headers.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const origin = `${protocol}://${host}`;

    if ((checkOnline && user) || (!checkOnline && !user)) {
        return NextResponse.redirect(origin + redirectTo);
    }
}

export default authRedirect;