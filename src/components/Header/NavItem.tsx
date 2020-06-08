import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = (props: NavItemProps) => {
  const {
    title, link, exact, onMount, closeNavMenu,
  } = props;

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
        onClick={closeNavMenu}
        activeClassName="nav__link--active"
      >
        {title}
      </NavLink>
    </li>
  );
};
