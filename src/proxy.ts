import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_PATH = '/login';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const token = request.cookies.get('auth-storage')?.value;
  
  let isAuthenticated = false;
  if (token) {
    try {
      const authData = JSON.parse(decodeURIComponent(token));
      isAuthenticated = authData.isAuthenticated || false;
    } catch (error) {
      
    }
  }
  
  if (pathname === AUTH_PATH && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname !== AUTH_PATH && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};