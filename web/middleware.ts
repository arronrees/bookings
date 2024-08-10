import { updateSession } from './app/lib/session';

export async function middleware() {
  return await updateSession();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
