import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set({ name, value, ...options }),
          );

          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set({ name, value, ...options }),
          );
        },
      },
    },
  );

  // 1. Отримуємо поточного користувача
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const currentPath = request.nextUrl.pathname;
  const isProfileRoute = currentPath.startsWith('/profile');
  const isAdminRoute = currentPath.startsWith('/admin');

  // 2. Якщо користувач НЕ авторизований, а роут захищений — редірект на /login
  if (!user && (isProfileRoute || isAdminRoute)) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', currentPath + request.nextUrl.search);

    const redirectResponse = NextResponse.redirect(url);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    });
    return redirectResponse;
  }

  // 3. Якщо користувач намагається зайти в /admin — перевіряємо його роль у базі
  if (user && isAdminRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    // Якщо профілю немає або роль не 'admin' — закриваємо доступ
    if (!profile || profile.role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/unauthorized'; // Або можна створити сторінку /403 чи /unauthorized

      const noAccessResponse = NextResponse.redirect(url);
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        noAccessResponse.cookies.set(cookie.name, cookie.value);
      });
      return noAccessResponse;
    }
  }

  return supabaseResponse;
};

export const config = {
  matcher: ['/profile/:path*', '/admin/:path*'],
};
