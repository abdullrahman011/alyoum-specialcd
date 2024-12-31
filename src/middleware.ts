import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
   const session = request.cookies.get('auth-session');
   console.log('Session cookie:', session);

   if (!session && request.nextUrl.pathname === '/dashboard') {
       return NextResponse.redirect(new URL('/auth/signin', request.url));
   }

   return NextResponse.next();
}
export const config = {
    matcher: [
      '/dashboard/:path*',
      '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
  };