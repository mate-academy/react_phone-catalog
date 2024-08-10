import React from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface Props {
  path: string;
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
}

export const NavItem: React.FC<Props> = ({
  path,
  children,
  className = '',
  uppercase = true,
}) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        twMerge(
          `relative flex h-full items-center
          justify-center text-secondary
          transition after:absolute after:bottom-0
          after:h-[3px] after:w-0
        after:bg-primary after:transition-[width]
        hover:text-primary hover:after:w-full`,
          isActive && 'text-primary after:w-full',
          className,
          uppercase && 'uppercase',
        )
      }
    >
      {children}
    </NavLink>
  );
};
