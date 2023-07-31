/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import {
  NavLink, useLocation,
} from 'react-router-dom';
import '../../styles/styles.scss';
import classNames from 'classnames';
import { SearchBar } from './SearchBar';
import { useAppSelector } from '../../app/hooks';

export const Header: FC = () => {
  const location = useLocation();
  const productsInCardCount = useAppSelector(
    state => state.phonesCarded.value,
  ).length;
  const productsFavoriteCount = useAppSelector(
    state => state.phonesFavorites.value,
  ).length;

  const showSearchBar = location.pathname === '/favorites'
  || location.pathname === '/phones'
  || location.pathname === '/tablets';

  return (
    <header className="header">
      <div className="header__content">
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
          {/* {productsInCardCount && ( */}
          {/* )} */}
        </div>
      </div>
    </header>
  );
};
