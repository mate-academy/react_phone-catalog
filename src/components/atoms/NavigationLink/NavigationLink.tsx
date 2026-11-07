import type React from 'react';
import { Typography } from '../Typography/Typography';
import { NavLink } from 'react-router-dom';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  classNames?: string;
  handleClickLink?: () => void;
};

export const NavigationLink: React.FC<NavLinkProps> = ({
  href,
  children,
  classNames,
  handleClickLink,
}) => {
  const isExternal = href.startsWith('http') || href.startsWith('//');

  // const typographyElement = (isActive = false) => (

  // );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full items-center"
      >
        <Typography
          level="uppercase"
          className={`transition-colors }
      ${classNames}`}
        >
          {children}
        </Typography>
      </a>
    );
  }

  return (
    <NavLink
      to={href}
      end
      className="group relative flex h-full items-center"
      onClick={handleClickLink}
    >
      {({ isActive }) => (
        <>
          <Typography
            level="uppercase"
            className={`transition-colors 
              ${isActive ? 'text-primary dark:text-white' : 'text-secondary group-hover:text-primary dark:group-hover:text-accent-dark'}
              ${classNames}`}
          >
            {children}
          </Typography>
          {isActive && (
            <span className="absolute bottom-0 left-0 h-[3px] w-full bg-primary dark:bg-white" />
          )}
        </>
      )}
    </NavLink>
  );
};
