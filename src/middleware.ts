import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const session = request.cookies.get('auth-session');
    console.log('Session cookie:', session); // للتصحيح

    if (!session && request.nextUrl.pathname === '/dashboard') {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard']
};