import React, { useContext, useState } from 'react';
import { useLocation, NavLink, Link } from 'react-router-dom';
import './Header.scss';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import { pageData } from '../../data/pageData';

import {
  ReactComponent as FavouritesIcon,
} from '../../images/icons/favourites.svg';
import {
  ReactComponent as FavouritesFilled,
} from '../../images/icons/favourites_filled.svg';
import {
  ReactComponent as CartIcon,
} from '../../images/icons/cart.svg';
import {
  ReactComponent as MenuIcon,
} from '../../images/icons/menu.svg';

import { Search } from '../Search/Search';
import { linkClass } from '../../helpers/linkClass';
import { ShopContext } from '../../ShopContext';
import { MenuMobile } from '../MenuMobile/MenuMobile';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { cart, favourites } = useContext(ShopContext);

  const [isMenuActive, setIsMenuActive] = useState(false);

  const counter = cart.length;

  const linkWithSearch = pageData
    .map(page => (page.isSearch ? page.link : null));

  const isSearch = linkWithSearch.some(link => link === pathname.slice(1));
  const isInCart = pathname === '/cart';
  const isFavouritesProducts = favourites.length > 0;
  const isCounter = counter > 0;

  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsMenuActive(true);
  };

  return (
    <header className="app_header header" id="header">
      <div className="header__content">
        <div className="header__container">
          {!isInCart && (
            <Link
              className="header__icon header__menu"
              to="#menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </Link>
          )}
          <div className="header__logo">
            <Logo />
          </div>
          {!isInCart && (
            <div className="header__nav">
              <Navigation />
            </div>
          )}
        </div>
        <div className="header__container">
          {isSearch && !isInCart && (
            <div className="header__search">
              <Search />
            </div>
          )}
          {!isInCart && (
            <NavLink className={linkClass.fav} to="favourites">
              {isFavouritesProducts
                ? <FavouritesFilled />
                : <FavouritesIcon />}
            </NavLink>
          )}
          <NavLink
            className={linkClass.icon}
            to="cart"
          >
            {isCounter && (
              <div className="header__cart-counter">{counter}</div>
            )}
            <CartIcon />
          </NavLink>
        </div>
      </div>
      <MenuMobile isMenuActive={isMenuActive} onMenuActive={setIsMenuActive} />
    </header>
  );
};
