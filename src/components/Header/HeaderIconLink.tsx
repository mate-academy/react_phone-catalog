import React from 'react';
import { Link, useLocation, type Location } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationState {
  background?: Location;
}

type Props = {
  to?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  state?: NavigationState;
};

export const HeaderIconLink = ({
  to,
  children,
  onClick,
  className,
  state,
}: Props) => {
  const { pathname } = useLocation();
  const isActive = to ? pathname === to : false;

  const content = (
    <>
      {children}

      <span
        className={cn(
          'absolute bottom-0 left-0 w-full h-[3px] transition-all duration-200',
          isActive ? 'bg-foreground' : 'bg-transparent group-hover:bg-popover',
        )}
      />
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        state={state}
        onClick={onClick}
        className={cn(
          'relative flex items-center justify-center group',
          className,
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center justify-center group',
        className,
      )}
    >
      {content}
    </button>
  );
};
