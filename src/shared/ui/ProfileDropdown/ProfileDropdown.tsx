'use client';

import { Moon, Sun, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

import { useTranslation } from '@/shared/hooks';
import { createClient } from '@/shared/lib/supabase/client';
import { cn } from '@/shared/lib/utils';

import { SettingsControls } from '../SettingsControls';

interface ProfileDropdownProps {
  className?: string;
  onClick?: () => void;
}

const supabase = createClient();

export const ProfileDropdown = ({
  className,
  onClick,
}: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className={cn(className, 'animate-pulse bg-brand-surface-1/10')} />
    );
  }

  const encodedPathname = pathname ? encodeURIComponent(pathname) : '';
  const profileHref = isAuthenticated
    ? '/profile'
    : `/login?next=${encodedPathname}`;
  const isActive = pathname?.startsWith(
    isAuthenticated ? '/profile' : '/login',
  );

  return (
    <div ref={dropdownRef} className={cn('relative h-full', className)}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Settings & Profile"
        aria-expanded={isOpen}
        className={cn(
          'flex h-full w-16 items-center justify-center border-l border-brand-elements transition-colors hover:bg-brand-surface-1 cursor-pointer lg:w-22',
          isAuthenticated ? 'text-brand-accent' : 'text-brand-white',
          isActive && 'bg-brand-surface-1',
        )}
      >
        <div className="relative">
          <User className="size-4 shrink-0" />
        </div>
        {isActive && (
          <span className="absolute bottom-0 h-0.75 w-full bg-brand-white" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 absolute right-0 top-full min-w-52 border border-brand-elements bg-brand-black shadow-xl">
          <Link
            href={profileHref}
            onClick={() => {
              setIsOpen(false);
              onClick?.();
            }}
            className={cn(
              'flex items-center gap-3 border-b border-brand-elements px-4 py-3 text-sm transition-colors hover:bg-brand-surface-1',
              isAuthenticated ? 'text-brand-accent' : 'text-brand-white',
            )}
          >
            <User className="size-4 shrink-0" />
            <span className="font-semibold uppercase tracking-wide text-xs">
              {isAuthenticated
                ? (t('profile') ?? 'Profile')
                : (t('login') ?? 'Login')}
            </span>
          </Link>

          {mounted && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
              }}
              className="flex w-full items-center gap-3 border-b border-brand-elements px-4 py-3 text-sm text-brand-white transition-colors hover:bg-brand-surface-1 cursor-pointer"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="size-4 shrink-0" />
              ) : (
                <Moon className="size-4 shrink-0" />
              )}
              <span className="font-semibold uppercase tracking-wide text-xs">
                {resolvedTheme === 'dark'
                  ? (t('lightTheme') ?? 'Light theme')
                  : (t('darkTheme') ?? 'Dark theme')}
              </span>
            </button>
          )}

          <SettingsControls />
        </div>
      )}
    </div>
  );
};
