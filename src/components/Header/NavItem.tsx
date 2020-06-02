import React, { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const NavItem = ({
  title, link, exact, linkRef,
}: NavItemProps) => {
  const location = useLocation();
  const refCheck = useMemo(
    () => (location.pathname.includes(link) ? linkRef : null),
    [location.pathname, link, linkRef],
  );

  return (
    <li className="nav__item">
      <NavLink
        to={link}
        ref={refCheck}
        exact={exact}
        className="nav__link"
      >
        {title}
      </NavLink>
    </li>
  );
};
