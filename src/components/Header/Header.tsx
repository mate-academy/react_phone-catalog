import classNames from 'classnames';
import './Header.scss';

import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search } from '../Search/Search';

export const Header = () => {
  const isActiveTab = ({ isActive }: { isActive: boolean }) => classNames(
    'nav__link', { nav__active: isActive },
  );

  const location = useLocation();
  const { pathname } = location;
  const isPathnameHome = pathname === '/';

  return (
    <header className="header">
      <div className="container">
        <div className="container__flex-start">
          <Link
            to="/"
            className="header__logo"
          />

          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className={isActiveTab}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav__item">
                <NavLink
                  to="/phones"
                  className={isActiveTab}
                >
                  Phones
                </NavLink>
              </li>

              <li className="nav__item">
                <NavLink
                  to="/tablets"
                  className={isActiveTab}
                >
                  Tablets
                </NavLink>
              </li>

              <li className="nav__item">
                <NavLink
                  to="/accessories"
                  className={isActiveTab}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="container__flex-end">
          {!isPathnameHome && (
            <Search />
          )}

          <NavLink
            to="favorites"
            className={({ isActive }: { isActive: boolean }) => classNames(
              'header__favorites',
              'nav__link',
              'nav__link--last',
              { nav__active: isActive },
            )}
          >
            {/* {favourites.length > 0 && (
              <div className="header__icon-count">
                {favourites.length}
              </div>
            )} */}
          </NavLink>

          <NavLink
            className={({ isActive }: { isActive: boolean }) => classNames(
              'header__shopping-cart',
              'nav__link',
              'nav__link--last',
              { nav__active: isActive },
            )}
            to="cart"
          >
            {/* {cart.length > 0 && (
              <div className="header__icon-count">
                {cart.length}
              </div>
            )} */}
          </NavLink>
        </div>

      </div>
    </header>
  );
};
