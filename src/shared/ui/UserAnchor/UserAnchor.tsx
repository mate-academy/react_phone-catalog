'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createClient } from '@/shared/lib/supabase/client';
import { cn } from '@/shared/lib/utils';

interface UserAnchorProps {
  className?: string;
  onClick?: () => void;
}

const supabase = createClient();

export const UserAnchor = ({ className, onClick }: UserAnchorProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setLoading(false);
      } else if (event === 'INITIAL_SESSION') {
        setIsAuthenticated(!!session);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className={cn(className, 'animate-pulse bg-brand-surface-1/10')} />
    );
  }

  const encodedPathname = pathname ? encodeURIComponent(pathname) : '';
  const targetHref = isAuthenticated
    ? '/profile'
    : `/login?next=${encodedPathname}`;

  const isActive = pathname?.startsWith(
    isAuthenticated ? '/profile' : '/login',
  );

  return (
    <Link
      href={targetHref}
      onClick={onClick}
      aria-label={isAuthenticated ? 'Profile' : 'Login'}
      className={cn(
        'relative flex h-full items-center justify-center transition-colors',
        isAuthenticated ? 'text-brand-accent' : 'text-brand-white',
        className,
      )}
    >
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </div>

      {isActive && (
        <span className="absolute bottom-0 h-0.75 w-full bg-brand-white" />
      )}
    </Link>
  );
};
