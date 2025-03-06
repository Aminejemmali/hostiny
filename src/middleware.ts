// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || 
                       path === '/signup' || 
                       path === '/reset-password' || 
                       path === '/verify-email' ||
                       path === '/';

  // Check if the request is for a public path
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Check if the user is authenticated by checking for a session cookie
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If no session exists, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is authenticated, proceed with the request
  return NextResponse.next();
}

// Configure the paths that should be checked by this middleware
export const config = {
  matcher: [
    // Match all paths except for:
    // - API routes (/api/*)
    // - Static files (/_next/*)
    // - Public files in the public folder (/public/*)
    // - Files with extensions (e.g., .css, .js, .svg, etc.)
    '/((?!api|_next|public|.*\\.).*)',
  ],
};