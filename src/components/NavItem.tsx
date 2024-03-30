import React from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface Props {
  path: string;
  children: React.ReactNode;
  className?: string;
}

export const NavItem: React.FC<Props> = ({
  path,
  children,
  className = '',
}) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        twMerge(
          `relative flex h-full items-center
          justify-center uppercase text-secondary
          transition after:absolute after:bottom-0
          after:h-[3px] after:w-0
        after:bg-primary after:transition-[width]
        hover:text-primary hover:after:w-full`,
          isActive && 'text-primary after:w-full',
          className,
        )
      }
    >
      {children}
    </NavLink>
  );
};
