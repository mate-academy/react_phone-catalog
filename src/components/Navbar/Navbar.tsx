import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import classNames from 'classnames';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => classNames('navbar__link', {
          'navbar__link--active': isActive,
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/phones"
        className={({ isActive }) => classNames('navbar__link', {
          'navbar__link--active': isActive,
        })}
      >
        Phones
      </NavLink>

      <NavLink
        to="/tablets"
        className={({ isActive }) => classNames('navbar__link', {
          'navbar__link--active': isActive,
        })}
      >
        Tablets
      </NavLink>

      <NavLink
        to="/accessories"
        className={({ isActive }) => classNames('navbar__link', {
          'navbar__link--active': isActive,
        })}
      >
        Accessories
      </NavLink>
    </nav>
  );
};
