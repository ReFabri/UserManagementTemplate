import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    //path === "/verifyemail" ||
    path === "/passwordrecovery" ||
    path === "/resetpassword";

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:id*",
    "/login",
    "/signup",
    //"/verifyemail",
    "/passwordrecovery",
    "/resetpassword",
  ],
};
