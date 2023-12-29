/* eslint-disable jsx-a11y/control-has-associated-label */
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';

import './Header.scss';
import {
  getIconNavClassName,
  getNavClassName,
} from '../../helpers/getNavClassName';
import { FavouritesContext } from '../../context/FavContext';
import { CartContext } from '../../context/CartContext';
import { SearchField } from '../SearchField';
import { MobileMenu } from '../../pages/MobileMenu';

export const Header = () => {
  const { favourites } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);
  const { pathname } = useLocation();
  const [isMenuShown, setIsMenuShown] = useState(false);

  const isSearchShown = pathname === '/phones'
    || pathname === '/tablets'
    || pathname === '/accessories'
    || pathname === '/favourites';

  const isCartOpen = pathname !== '/cart';

  return (
    <header className="Header" id="header">
      <div className="Header__container-left">
        <Link to="/" className="Header__logo">
          <div className="Header__logo-image" />
        </Link>

        <button
          type="button"
          className="Header__burger"
          onClick={() => setIsMenuShown(true)}
        >
          <span className="Header__burger-span Header__burger-span--one" />
          <span className="Header__burger-span Header__burger-span--two" />
          <span className="Header__burger-span Header__burger-span--three" />
        </button>

        <MobileMenu isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} />

        {isCartOpen && (
          <nav
            className="Header__navigation"
            role="navigation"
            aria-label="main navigation"
          >
            <ul className="Header__navigation-list">
              <li className="Header__navigation-item">
                <NavLink
                  className={getNavClassName}
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={getNavClassName}
                  to="/phones"
                >
                  Phones
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={getNavClassName}
                  to="/tablets"
                >
                  Tablets
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={getNavClassName}
                  to="/accessories"
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div className="Header__container-right">
        {isSearchShown && <SearchField />}

        {isCartOpen && (
          <NavLink to="/favourites" className={getIconNavClassName}>
            <div className="Header__icon-link-image icon icon--favourites">
              {!!favourites.length && (
                <div className="Header__icon-link-fav">
                  <span className="Header__icon-link-fav-amount">
                    {favourites.length}
                  </span>
                </div>
              )}
            </div>
          </NavLink>
        )}

        <NavLink to="/cart" className={getIconNavClassName}>
          <div className="Header__icon-link-image icon icon--cart">
            {!!cart.length && (
              <div className="Header__icon-link-fav">
                <span className="Header__icon-link-fav-amount">
                  {cart.length}
                </span>
              </div>
            )}
          </div>
        </NavLink>
      </div>
    </header>
  );
};
