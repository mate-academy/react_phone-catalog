import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type PageNavLinkProps = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<PageNavLinkProps> = ({
  text,
  to,
}) => {
  return (
    <NavLink
      to={to}
      className={(({ isActive }) => classNames('nav__link', 'link', {
        'nav__link--active': isActive,
      }))}
    >
      {text}
    </NavLink>
  );
};
