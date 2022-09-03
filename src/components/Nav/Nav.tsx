/* eslint-disable array-callback-return */
import './Nav.scss';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <div className="nav">
      <ul className="nav__menu">
        <li
          className="nav__menuitem"
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive
              ? 'nav__is-active nav__navlink'
              : 'nav__navlink')}
          >
            home
          </NavLink>
        </li>

        <li className="nav__menuitem">
          <NavLink
            to="/phones"
            className={({ isActive }) => (isActive
              ? 'nav__is-active nav__navlink'
              : 'nav__navlink')}
          >
            phones
          </NavLink>
        </li>

        <li className="nav__menuitem">
          <NavLink
            to="/tablets"
            className={({ isActive }) => (isActive
              ? 'nav__is-active nav__navlink'
              : 'nav__navlink')}
          >
            tablets
          </NavLink>
        </li>

        <li className="nav__menuitem">
          <NavLink
            to="/accessories"
            className={({ isActive }) => (isActive
              ? 'nav__is-active nav__navlink'
              : 'nav__navlink')}
          >
            accessories
          </NavLink>
        </li>

      </ul>

    </div>
  );
};
