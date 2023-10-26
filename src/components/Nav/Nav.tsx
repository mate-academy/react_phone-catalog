import './Nav.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Logo } from '../Logo';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar__item',
  { 'navbar__item--is-active': isActive },
);

export const Nav = () => (
  <nav
    className="header_navbar navbar"
    data-cy="nav"
    role="navigation"
    aria-label="main navigation"
  >
    <Logo />

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
