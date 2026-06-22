'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { cn } from '@/shared/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn(className, 'opacity-0')} />;
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      }}
      className={cn(
        'items-center justify-center cursor-pointer select-none focus:outline-none',
        className,
      )}
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="size-5 shrink-0" />
      ) : (
        <Moon className="size-5 shrink-0" />
      )}
    </button>
  );
};
