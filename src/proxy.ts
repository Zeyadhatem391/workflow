import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const isProtectedRoute =
        pathname === "/" || pathname.startsWith("/dashboard");

    const userCookie = request.cookies.get("user")?.value;

    if (isProtectedRoute && !userCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*"],
};