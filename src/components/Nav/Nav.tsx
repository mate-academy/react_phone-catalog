import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './Nav.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('Nav__link', {
    'Nav__link--is-active': isActive,
  });
};

export const Nav = () => {
  return (
    <nav className="Nav">
      <NavLink
        to="/"
        className={getLinkClass}
      >
        Home
      </NavLink>

      <NavLink
        to="/phones"
        className={getLinkClass}
      >
        Phones
      </NavLink>

      <NavLink
        to="/tablets"
        className={getLinkClass}
      >
        Tablets
      </NavLink>

      <NavLink
        to="/accessories"
        className={getLinkClass}
      >
        Accessories
      </NavLink>
    </nav>
  );
};
