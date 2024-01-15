import './Header.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Link, NavLink, useLocation,
} from 'react-router-dom';
import classNames from 'classnames';
import { useContext } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { FavouriteContext } from '../../contexts/FavoriteContext';
import { CartContext } from '../../contexts/CartContext';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'header__link', { 'header__link--active': isActive },
);

const getActionClass = ({ isActive }: { isActive: boolean }) => classNames(
  'header__action', { 'header__action--active': isActive },
);

export const Header = () => {
  const { pathname } = useLocation();
  const { favourites } = useContext(FavouriteContext);
  const { cart } = useContext(CartContext);

  const isSearchShown = pathname === '/phones'
    || pathname === '/tablets'
    || pathname === '/accessories'
    || pathname === '/favourites';
  const isCart = pathname === '/cart';

  return (
    <header className="header">
      <div className="header__navbar">
        <Link className="header__logo" to="/">
          <img
            className="header__image"
            src="/img/header/Logo.svg"
            alt="Logo"
          />
        </Link>

        {!isCart && (
          <nav className="header__nav">
            <ul className="header__list">
              <li className="header__item">
                <NavLink
                  className={getLinkClass}
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              <li className="header__item">
                <NavLink
                  className={getLinkClass}
                  to="/phones"
                >
                  Phones
                </NavLink>
              </li>

              <li className="header__item">
                <NavLink
                  className={getLinkClass}
                  to="/tablets"
                >
                  Tablets
                </NavLink>
              </li>

              <li className="header__item">
                <NavLink
                  className={getLinkClass}
                  to="/accessories"
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div className="header__actions">
        {isSearchShown && (<SearchBar />)}

        {!isCart && (
          <NavLink
            to="/favourites"
            className={getActionClass}
          >
            <i className="icon icon--favourites">
              {favourites.length > 0
                && (
                  <span
                    className="header__counter"
                  >
                    {favourites.length}
                  </span>
                )}
            </i>
          </NavLink>
        )}

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <NavLink
          to="/cart"
          className={getActionClass}
        >
          <i className="icon icon--cart">
            {cart.length > 0
              && (
                <span
                  className="header__counter"
                >
                  {cart.length}
                </span>
              )}
          </i>
        </NavLink>
      </div>
    </header>
  );
};
