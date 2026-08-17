import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRETKEY });
  const url = request.nextUrl;

  // Logged in? Keep them out of auth pages.
  if (token && (
    url.pathname.startsWith("/sign-in") ||
    url.pathname.startsWith("/sign-up") ||
    url.pathname.startsWith("/verify") ||
    url.pathname === "/"
  )) {
    console.log(request.url+"sjfsj");
    return NextResponse.redirect(new URL('/Dashboard', request.url));
  }

  // Not logged in? Keep them out of protected pages.
  if (!token && url.pathname.startsWith("/Dashboard")) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/verify',
    '/',
    '/Dashboard/:path*',
  ]
}
