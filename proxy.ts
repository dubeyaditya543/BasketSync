import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken } from "./lib/jwt";

const PROTECTED_PATHs = ["/dashboard"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHs.some((path) => pathname.includes(path));

  const isAuthRoute =
    pathname === "/" || pathname.includes("/login") || pathname.includes("/signup");

  if (isAuthRoute) {
    const refreshToken = request.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.next();
    }

    try {
      verifyRefreshToken(refreshToken);
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    } catch {
      return NextResponse.next();
    }
  }

  if (!isProtected) {
    return NextResponse.next();
  }
  
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    verifyRefreshToken(refreshToken);
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/", "/login", "/signup"],
};
