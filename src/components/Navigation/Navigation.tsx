import './Navigation.scss';

import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const isActiveLink = ({ isActive }: { isActive: boolean }) => cn(
  'navigation__link', {
    'navigation__link-is-active': isActive,
  },
);

export const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink
        className={isActiveLink}
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={isActiveLink}
        to="/phones"
      >
        Phones
      </NavLink>

      <NavLink
        className={isActiveLink}
        to="/tablets"
      >
        Tablets
      </NavLink>

      <NavLink
        className={isActiveLink}
        to="/accessories"
      >
        Accessories
      </NavLink>
    </nav>
  );
};
