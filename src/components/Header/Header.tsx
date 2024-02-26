import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { LogoIcon } from '../../assets/icons/LogoIcon';
import { NavBar } from '../NavBar/NavBar';
import { Search } from '../Search/Search';
import { NavLinkHeader } from '../NavLinkHeader/NavLinkHeader';
import { FavIcon } from '../../assets/icons/FavIcon';
import { CartIcon } from '../../assets/icons/CartIcon';

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
        <Link to="/" className="header__logo">
          <LogoIcon />
        </Link>
        <NavBar />
      </div>

      <div className="header__top-actions">
        {showSearch && <Search />}

        {showFavorites && (
          <NavLinkHeader type="icon" to="favorites">
            <FavIcon />
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
