import { NextResponse } from 'next/server';

export function middleware(request) {
  // You can add your middleware logic here
  // For example, you might want to check if the user is authenticated

  // const isAuthenticated = checkUserAuthentication(request);
  // if (!isAuthenticated && request.nextUrl.pathname.startsWith('/game')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // For now, we'll just pass through all requests
  return NextResponse.next();
}

// Optional: Configure on which paths to run the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};