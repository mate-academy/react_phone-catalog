import { NavLink, Link } from 'react-router-dom';
import { Logo } from './Logo';
import './Navbar.scss';
import { getLinkClass } from '../helpers/getLinkClass';

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar-main is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar__container">
        <div className="navbar-brand">
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
        </div>
        <div className="navbar__right">
          <Link
            to="/favourite"
            className="favourities__link"
          >
            <div className="navbar-right__block">
              <div className="navbar__icons liked" />
            </div>
          </Link>
          <Link
            to="/cart"
            className="cart__link"
          >
            <div className="navbar-right__block">
              <div className="navbar__icons backet" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
