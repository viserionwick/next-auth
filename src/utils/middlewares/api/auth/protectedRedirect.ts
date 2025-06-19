// Essentials
import { NextRequest, NextResponse } from "next/server";

const protectedRedirect = async (req: NextRequest, redirectTo: string) => {
    const host = req.headers.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const origin = `${protocol}://${host}`;

    return NextResponse.redirect(origin + redirectTo);
}

export default protectedRedirect;