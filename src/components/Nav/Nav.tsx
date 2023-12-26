import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

export function Nav() {
  return (
    <nav className="header__nav nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            to="home"
            className={({ isActive }) => classNames(
              'nav__link',
              { 'nav__link--is-active': isActive },
            )}
          >
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="phones"
            className={({ isActive }) => classNames(
              'nav__link',
              { 'nav__link--is-active': isActive },
            )}
          >
            Phones
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="tablets"
            className={({ isActive }) => classNames(
              'nav__link',
              { 'nav__link--is-active': isActive },
            )}
          >
            Tablets
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="accessories"
            className={({ isActive }) => classNames(
              'nav__link',
              { 'nav__link--is-active': isActive },
            )}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
