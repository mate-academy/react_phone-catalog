import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ title, link, exact, onMount }: NavItemProps) => {
  const ref = useRef(null);

  useEffect(() => {
    onMount(link, ref);
  }, [onMount, link, ref]);

  return (
    <li className="nav__item">
      <NavLink
        to={link}
        ref={ref}
        exact={exact}
        className="nav__link"
      >
        {title}
      </NavLink>
    </li>
  );
};
