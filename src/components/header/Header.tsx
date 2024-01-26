import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import logo from '../../icons/logo.svg';
import { SearchField } from '../SearchField';
import { FavoriteContext } from '../../api/context/FavoriteContext';
import { CardContext } from '../../api/context/CardContext';

export const NavBar: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('nav__link', { 'is-active': isActive });
  };

  const { favProducts } = useContext(FavoriteContext);
  const { cardProducts } = useContext(CardContext);
  const { pathname } = useLocation();
  const isSearchShown = pathname === '/phones'
    || pathname === '/tablets'
    || pathname === '/accessories'
    || pathname === '/favorites';

  const isCartOpen = pathname !== '/card';

  return (
    <>
      <header className="header">
        <div className="header__links">
          <Link className="header__logo" to="/">
            <img src={logo} alt="logo" />
          </Link>

          <div className="nav">
            {isCartOpen && (
              <ul className="nav__list">
                <li className="nav__item">
                  <NavLink to="/" className={getLinkClass}>Home</NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    to="/phones"
                    className={getLinkClass}
                  >
                    Phones
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    to="/tablets"
                    className={getLinkClass}
                  >
                    tablets
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    to="/accessories"
                    className={getLinkClass}
                  >
                    accessories
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="header__icons">
          {isSearchShown && <SearchField />}

          {isCartOpen && (
            <NavLink to="/favorites" className="header__icons--link">
              <div className="header__icons--link-img icon icon--fav">
                {!!favProducts.length && (
                  <div className="header__icons--link-fav">
                    <span className="header__icons--link-fav-amount">
                      {favProducts.length}
                    </span>
                  </div>
                )}
              </div>
            </NavLink>

          )}

          <NavLink to="/card" className="header__icons--link">
            <div className="header__icons--link-img icon icon--shop">
              {!!cardProducts.length && (
                <div className="header__icons--link-fav">
                  <span className="header__icons--link-fav-amount">
                    {cardProducts.length}
                  </span>
                </div>
              )}
            </div>
          </NavLink>
        </div>
      </header>
    </>
  );
};
