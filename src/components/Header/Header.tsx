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

        {!isPathnameHome && (
          <div className="header__icon-search">
            <Search />
          </div>
        )}

        <NavLink
          to="favorites"
          className={({ isActive }: { isActive: boolean }) => classNames(
            'header__favorites',
            'nav__link',
            { nav__active: isActive },
          )}
        >
          {/* {favourites.length > 0 && (
            <div className="header__icon-count">
              {favourites.length}
            </div>
          )} */}
        </NavLink>

      </div>
    </header>
  );
};
