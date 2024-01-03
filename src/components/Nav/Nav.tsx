import classNames from 'classnames';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductContext } from '../../helpers/ProductsContext';
import { MOBILE_MAX_WIDTH } from '../../helpers/vars';
import './Nav.scss';

export function Nav() {
  const { windowWidth } = useContext(ProductContext);

  return (
    <nav className="nav">
      <ul
        className={classNames(
          'nav__list',
          { 'nav__list--aside': windowWidth <= 960 },
        )}
      >
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
        {windowWidth <= MOBILE_MAX_WIDTH && (
          <li className="nav__item">
            <NavLink
              to="favorites"
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--is-active': isActive },
              )}
            >
              Favorites
            </NavLink>
          </li>
        )}
        {windowWidth <= MOBILE_MAX_WIDTH && (
          <li className="nav__item">
            <NavLink
              to="cart"
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--is-active': isActive },
              )}
            >
              Cart
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
