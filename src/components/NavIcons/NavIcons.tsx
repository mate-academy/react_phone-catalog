import classNames from 'classnames';
import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavIcons.scss';
import { CartStorageContext } from '../../context/CartStorageContext';
import { FavoriteStorageContext } from '../../context/FavoriteStorageContext';

export const NavIcons: FC = () => {
  const { cartItems } = useContext(CartStorageContext);
  const { favorites } = useContext(FavoriteStorageContext);

  return (
    <>
      <NavLink
        to="/favorites"
        className={({ isActive }) => classNames(
          'navbar__icon',
          { 'has-background-grey-lighter': isActive },
          { 'nav-link-active': isActive },
        )}
      >
        <img
          src="img/Icons/Favourites.svg"
          alt="Favourites"
          className="navbar__icon-image"
        />

        {favorites.length > 0 && (
          <div className="navbar__counter">
            <p className="navbar__counter--text">
              {favorites.length}
            </p>
          </div>
        )}

      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => classNames(
          'navbar__icon',
          { 'has-background-grey-lighter': isActive },
          { 'nav-link-active': isActive },
        )}
      >
        <img
          src="img/Icons/Cart.svg"
          alt="Cart"
          className="navbar__icon-image"
        />

        {cartItems.length > 0 && (
          <div className="navbar__counter">
            <p className="navbar__counter--text">
              {cartItems.length}
            </p>
          </div>
        )}

      </NavLink>
    </>
  );
};
