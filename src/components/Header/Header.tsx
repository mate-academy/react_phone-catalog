import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import './Header.scss';
import { PhoneCatalogContext } from '../../PhoneCatalogContext';

export const Header: React.FC = () => {
  const {
    setQuery,
    error,
    query,
  } = useContext(PhoneCatalogContext);

  const location = useLocation();

  useEffect(() => {
    setQuery('');
  }, [location.pathname, setQuery]);

  const handleNavigation = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <header className="header">
      <div className="header__aligned-left">
        <Link to="/" className="header__logo logo" />
        {location.pathname === '/cart' ? (
          ''
        ) : (
          <nav className="nav">
            <NavLink
              to="/"
              className="nav__link uppercase-text"
              onClick={handleNavigation}
            >
              HOME
            </NavLink>
            <NavLink
              to="/phones"
              className="nav__link uppercase-text"
              onClick={handleNavigation}
            >
              PHONES
            </NavLink>
            <NavLink
              to="/tablets"
              className="nav__link uppercase-text"
              onClick={handleNavigation}
            >
              TABLETS
            </NavLink>
            <NavLink
              to="/accessories"
              className="nav__link uppercase-text"
              onClick={handleNavigation}
            >
              ACCESSORIES
            </NavLink>
          </nav>
        )}
      </div>
      <div className="header__aligned-right">
        {
          [
            '/phones',
            '/tablets',
            '/accessories',
            '/favorites',
          ].includes(location.pathname)
            ? (
              <div className="header__aligned-right__search">
                <input
                  className="header__aligned-right__search__text"
                  spellCheck="false"
                  type="text"
                  placeholder={`Search in ${location.pathname.replace(/\//g, '')}...`}
                  value={query}
                  onChange={(e) => handleQueryChange(e)}
                  disabled={Boolean(error)}
                />
                <div
                  className="header__aligned-right__search__icon icon search"
                />
              </div>
            ) : (
              ''
            )
        }
        {location.pathname === '/cart' ? (
          ''
        ) : (
          <NavLink
            className="
            header__aligned-right__box header__aligned-right__favorite
            "
            to="/favorites"
            onClick={handleNavigation}
          >
            <div
              className="header__aligned-right__favorite__icon icon favorite"
            />
          </NavLink>
        )}
        <NavLink
          className={
            cn(
              [
                'header__aligned-right__box header__aligned-right__cart',
                {
                  'header__aligned-right__cart__active':
                    location.pathname === '/cart',
                },
              ],
            )
          }
          to="/cart"
          onClick={handleNavigation}
        >
          <div className="header__aligned-right__cart__icon icon cart" />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
