import { NextResponse } from 'next/server';

import { createClient } from '@/shared/lib/supabase/server';

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get('code');
  const next =
    searchParams.get('next') ?? searchParams.get('forwarded_next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const safeRedirectUrl = new URL(next, origin);

      if (safeRedirectUrl.origin === origin) {
        return NextResponse.redirect(safeRedirectUrl.href);
      }

      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
};
