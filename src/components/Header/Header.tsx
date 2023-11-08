import React from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { NavLinkHeader } from '../NavLinkHeader';
import { NavBar } from '../NavBar';
import { FavouritesIcon } from '../../assets/images/icons/FavouritesIcon';
import { CartIcon } from '../../assets/images/icons/CartIcon';
import { useAppSelector } from '../../utils/hooks/hooks';
import './Header.scss';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { favourites } = useAppSelector((state) => state.favourites);
  const { cartItems } = useAppSelector((state) => state.cartItems);
  const showFavourites = !pathname.endsWith('cart');

  return (
    <header className="header">
      <div className="header__navigation">
        <Logo />
        <NavBar />
      </div>

      <div className="header__top-actions">
        {showFavourites && (
          <NavLinkHeader type="icon" to="favourites">
            <FavouritesIcon />
            {favourites.length > 0 && <span>{favourites.length}</span>}
          </NavLinkHeader>
        )}

        <NavLinkHeader type="icon" to="cart">
          <CartIcon />
          {cartItems.length > 0 && <span>{cartItems.length}</span>}
        </NavLinkHeader>
      </div>
    </header>
  );
};
