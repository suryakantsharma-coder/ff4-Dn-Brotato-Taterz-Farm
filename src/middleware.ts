import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  // Skip middleware for Next.js internals and public assets
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.startsWith('/assets') ||
    url.pathname.startsWith('/images') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.ttf') ||
    url.pathname.endsWith('.otf')
  ) {
    return NextResponse.next();
  }

  if (hostname === 'raffles.davydonothing.com') {
    // Rewrite root
    if (url.pathname === '/') {
      url.pathname = '/raffle';
    } else {
      url.pathname = `/raffle${url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
