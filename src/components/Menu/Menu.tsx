import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import './Menu.scss';
import logo from '../../img/logo.png';

export const Menu = () => {
  const location = useLocation();
  const currentLocation
    = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);

  return (
    <>
      <NavLink
        to="/"
        className="nav__logo"
      >
        <img src={logo.toString()} alt="logo" />
      </NavLink>

      {currentLocation !== 'cart' && (
        <>
          <NavLink
            to="/"
            className={({ isActive }) => classNames('nav__link', {
              'nav__link--active': isActive,
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) => classNames('nav__link', {
              'nav__link--active': isActive,
            })}
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) => classNames('nav__link', {
              'nav__link--active': isActive,
            })}
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) => classNames('nav__link', {
              'nav__link--active': isActive,
            })}
          >
            Accessories
          </NavLink>
        </>
      )}
    </>
  );
};
