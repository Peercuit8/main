import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/auth')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase environment variables are missing, prevent hanging network requests
  if (!supabaseUrl || !supabaseAnonKey) {
    if (!isAuthRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  // Fast check: if no Supabase auth cookie exists, skip the network request entirely
  const allCookies = request.cookies.getAll()
  const hasAuthCookie = allCookies.some((c) =>
    c.name.startsWith('sb-') || c.name.includes('supabase')
  )

  if (!hasAuthCookie) {
    if (!isAuthRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Enforce a strict 2s timeout on edge network calls to prevent Vercel 504 GATEWAY_TIMEOUT
    const timeoutPromise = new Promise<{ data: { user: null } }>((resolve) =>
      setTimeout(() => resolve({ data: { user: null } }), 2000)
    )

    const {
      data: { user },
    } = await Promise.race([
      supabase.auth.getUser(),
      timeoutPromise
    ])

    // Protect routes
    if (!user && !isAuthRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Redirect logged-in users away from /login
    if (user && isAuthRoute && request.nextUrl.pathname === '/login') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (error) {
    console.error('Middleware updateSession error:', error)
    if (!isAuthRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }
}

