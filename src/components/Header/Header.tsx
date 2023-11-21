import React from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { NavLinkHeader } from '../NavLinkHeader';
import { NavBar } from '../NavBar';
import { FavoritesIcon } from '../../assets/images/icons/FavoritesIcon';
import { CartIcon } from '../../assets/images/icons/CartIcon';
import { useAppSelector } from '../../utils/hooks/hooks';
import { Search } from '../Search';
import './Header.scss';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { favorites } = useAppSelector((state) => state.favorites);
  const { cartItems } = useAppSelector((state) => state.cartItems);
  const showFavorites = !pathname.endsWith('cart');
  const showSearch = pathname.endsWith('phones')
    || pathname.endsWith('tablets')
    || pathname.endsWith('accessories')
    || pathname.endsWith('favorites');

  return (
    <header className="header">
      <div className="header__navigation">
        <Logo />
        <NavBar />
      </div>

      <div className="header__top-actions">
        {showSearch && <Search />}

        {showFavorites && (
          <NavLinkHeader type="icon" to="favorites">
            <FavoritesIcon />
            {favorites.length > 0 && <span>{favorites.length}</span>}
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
