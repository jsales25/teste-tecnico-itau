import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;

  const isProtectedPage = 
    request.nextUrl.pathname.startsWith("/products") || 
    request.nextUrl.pathname.startsWith("/change-password");

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const isAuthPage = 
    request.nextUrl.pathname === "/sign-in" || 
    request.nextUrl.pathname === "/sign-up";

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/change-password/:path*", "/sign-in", "/sign-up"],
};
