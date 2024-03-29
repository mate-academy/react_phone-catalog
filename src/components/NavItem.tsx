import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

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
        classNames(
          `relative flex h-full items-center
          justify-center uppercase transition
          after:absolute after:bottom-0 after:h-[3px]
          after:w-0 after:bg-primary
        after:transition-[width] hover:after:w-full
        [&:not(.text-primary)]:text-secondary [&:not(.text-primary)]:hover:text-primary`,
          {
            'text-primary after:w-full': isActive,
            [className]: className,
          },
        )
      }
    >
      {children}
    </NavLink>
  );
};
