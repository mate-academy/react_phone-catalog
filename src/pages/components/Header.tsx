/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react';
import {
  NavLink, useLocation,
} from 'react-router-dom';
import '../../styles/styles.scss';
import classNames from 'classnames';
import { SearchBar } from './SearchBar';
import { useAppSelector } from '../../app/hooks';
import {
  favoriteProductsSelector,
  phoneCardSelector,
} from '../../app/selector';

export const Header: FC = () => {
  const location = useLocation();
  const productsInCardCount = useAppSelector(phoneCardSelector).length;
  const productsFavoriteCount = useAppSelector(favoriteProductsSelector).length;

  const showSearchBar = location.pathname === '/favorites'
  || location.pathname === '/phones'
  || location.pathname === '/tablets';
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);

  useEffect(() => {
    if (isBurgerMenu) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }
  }, [isBurgerMenu]);

  const handleBurgerMenu = () => {
    setIsBurgerMenu(prev => !prev);
  };

  return (
    <>
      <header className="header">
        <div className="header__content">
          <button
            className={classNames(
              'hamburger-button',
              { 'hamburger-button--is-active': isBurgerMenu },
            )}
            type="button"
            onClick={handleBurgerMenu}
          >
            <img src="images/icons/icon-burger-menu.svg" alt="Burgermenu" />
          </button>
          <nav className="header__nav nav">
            <NavLink to="/" className="nav__link">
              <img src="images/logo.jpg" alt="Logo" />
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--active': isActive },
              )}
            >
              home
            </NavLink>
            <NavLink
              to={`/phones${location.search.toString()}`}
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--active': isActive },
              )}
            >
              Phones
            </NavLink>
            <NavLink
              to={`/tablets${location.search.toString()}`}
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--active': isActive },
              )}
            >
              tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--active': isActive },
              )}
            >
              accessories
            </NavLink>
          </nav>

          <div
            className="
          header__favorites-card-buttons
          favorites-card-buttons
          "
          >
            {showSearchBar && (<SearchBar />)}
            <NavLink
              to="/favorites"
              className={({ isActive }) => classNames(
                'favorites-card-buttons__link',
                { 'favorites-card-buttons__link--active': isActive },
              )}
            >
              <img
                className="favorites-card-buttons__icon icon--favorite"
                src="images/icons/HeartLike.svg"
                alt="Favorites"
              />
              {productsFavoriteCount > 0 && (
                <div
                  className="
                favorites-card-buttons__amount-of-products
                amount-of-products--favorite
                "
                >
                  {productsFavoriteCount}
                </div>
              )}
            </NavLink>
            <NavLink
              to="/card"
              className={({ isActive }) => classNames(
                'favorites-card-buttons__link',
                { 'favorites-card-buttons__link--active': isActive },
              )}
            >
              <img
                className="favorites-card-buttons__icon icon--card"
                src="images/icons/ShoppingbagCart.svg"
                alt="Shopping bag"
              />
              {productsInCardCount > 0 && (
                <div
                  className="
                favorites-card-buttons__amount-of-products
                amount-of-products--card
                "
                >
                  {productsInCardCount}
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </header>
      <aside className={classNames(
        'burger-menu',
        { 'burger-menu--active': isBurgerMenu },
      )}
      >
        <nav className="burger-menu__nav-burger nav-burger">
          <div className="nav-burger__logo-containter">
            <NavLink
              to="/"
              className="nav-burger__link"
              onClick={handleBurgerMenu}
            >
              <img
                className="nav-burger__logo"
                src="images/logo.jpg"
                alt="Logo"
              />
            </NavLink>
            <button
              className={classNames(
                'nav-burger__burger-menu-button',
                { 'nav-burger__burger-menu-button--is-active': isBurgerMenu },
              )}
              type="button"
              onClick={handleBurgerMenu}
            >
              <img src="images/icons/icon-close.svg" alt="Burgermenu" />
            </button>
          </div>
          <NavLink
            to="/"
            className={({ isActive }) => classNames(
              'nav-burger__link',
              { 'nav-burger__link--active': isActive },
            )}
            onClick={handleBurgerMenu}
          >
            home
          </NavLink>
          <NavLink
            to={`/phones${location.search.toString()}`}
            className={({ isActive }) => classNames(
              'nav-burger__link',
              { 'nav-burger__link--active': isActive },
            )}
            onClick={handleBurgerMenu}
          >
            Phones
          </NavLink>
          <NavLink
            to={`/tablets${location.search.toString()}`}
            className={({ isActive }) => classNames(
              'nav-burger__link',
              { 'nav-burger__link--active': isActive },
            )}
            onClick={handleBurgerMenu}
          >
            tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) => classNames(
              'nav-burger__link',
              { 'nav-burger__link--active': isActive },
            )}
            onClick={handleBurgerMenu}
          >
            accessories
          </NavLink>
        </nav>
      </aside>
    </>
  );
};
