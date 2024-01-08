/* eslint-disable jsx-a11y/control-has-associated-label */
import './Header.scss';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  getIconNavClassName,
  getNavClassName,
} from '../../helpers/getNavClassName';
import { useAppSelector } from '../../app/hooks';
import { MobileMenu } from '../../pages/MobileMenu/MobileMenu';
import { SearchField } from '../SearchField/SearchField';

export const Header = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const { pathname } = useLocation();

  const isSearchShown = pathname === '/phones'
  || pathname === '/tablets'
  || pathname === '/accessories'
  || pathname === '/favourites';

  const isCartOpen = pathname !== '/cart';

  const favouriteProducts = useAppSelector((state) => state.favourites.items);

  const cartProducts = useAppSelector((state) => state.cartProducts.items);

  return (
    <header className="Header" id="header">
      <div className="Header__container-left">
        <button
          type="button"
          className="Header__burger"
          onClick={() => setIsMenuShown(true)}
        >
          <span className="Header__burger-span Header__burger-span--one" />
          <span className="Header__burger-span Header__burger-span--two" />
          <span className="Header__burger-span Header__burger-span--three" />
        </button>

        <Link to="/" className="Header__logo">
          <div className="Header__logo-image" />
        </Link>

        <MobileMenu isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} />

        {isCartOpen && (
          <nav
            className="Header__navigation"
            role="navigation"
            aria-label="main navigation"
          >
            <ul className="Header__navigation-list">
              <li className="Header__navigation-item">
                <NavLink className={getNavClassName} to="/">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink className={getNavClassName} to="/phones">
                  Phones
                </NavLink>
              </li>

              <li>
                <NavLink className={getNavClassName} to="/tablets">
                  Tablets
                </NavLink>
              </li>

              <li>
                <NavLink className={getNavClassName} to="/accessories">
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
              {!!favouriteProducts.length && (
                <div className="Header__icon-link-fav">
                  <span className="Header__icon-link-fav-amount">
                    {favouriteProducts.length}
                  </span>
                </div>
              )}
            </div>
          </NavLink>
        )}

        <NavLink to="/cart" className={getIconNavClassName}>
          <div className="Header__icon-link-image icon icon--cart">
            {!!cartProducts.length && (
              <div className="Header__icon-link-fav">
                <span className="Header__icon-link-fav-amount">
                  {cartProducts.length}
                </span>
              </div>
            )}
          </div>
        </NavLink>
      </div>
    </header>
  );
};
