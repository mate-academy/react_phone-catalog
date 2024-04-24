import { Link, NavLink } from 'react-router-dom';
import './NavBar.scss';
import classNames from 'classnames';

export function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('navbar-link', { 'is-active': isActive });
}

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src="./img/logo/logo_phone_catalog.svg" alt="LOGO" />
        </Link>
      </div>

      <div className="navbar__links">
        <ul className="navbar__items">
          <li className="navbar__item">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
          </li>

          <li className="navbar__item">
            <NavLink to="/home" className={getNavLinkClass}>
              Phones
            </NavLink>
          </li>

          <li className="navbar__item">
            <NavLink to="/home" className={getNavLinkClass}>
              Tablets
            </NavLink>
          </li>

          <li className="navbar__item">
            <NavLink to="/home" className={getNavLinkClass}>
              Accessories
            </NavLink>
          </li>
        </ul>

        <div className="navbar__buttons">
          <Link to="/basket" className="navbar-button">
            <img
              className="navbar-button__logo"
              src="./img/logo/logos/heart_empty_12_count.svg"
              alt="favourite"
            />
          </Link>
          <Link to="/basket" className="navbar-button">
            <img
              className="navbar-button__logo"
              src="./img/logo/logos/shop_bag_12_count.svg"
              alt="basket"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};
