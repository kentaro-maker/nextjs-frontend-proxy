import {NextRequest, NextResponse} from 'next/server'
import { getSession } from './lib/session'
import { logout } from './app/_action';

export async function middleware(request: NextRequest) {

  console.log("[middleware.ts]: Accessed to ", request.url )

  if (request.url.includes("/logout")) {

    const response = NextResponse.redirect(new URL('/login', request.url))

    const session = await getSession(request, response)
    if(session.user) {
      const result = await logout(request)
      console.log(result)
    }
    await session.destroy()
    

    return response;
  }

  if (request.url.includes("/login") || request.url.includes("/register")) {
    const response = NextResponse.next()
    const session = await getSession(request, response)
    console.log("[middleware.ts]: result from getSession: ", session)

    if(session.user) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // return response;
  }

  return NextResponse.next()
}

export const config = {
    matcher: ['/logout', '/login', '/register'],
}
