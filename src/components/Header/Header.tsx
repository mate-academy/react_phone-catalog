import React, { useContext, useMemo } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { FavContext } from '../../providers/FavProvider/FavProvider';
import { CartContext } from '../../providers/CartProvider/CartProvider';

import { Search } from '../Search/Search';
import { locationsForSearch } from '../../helpers/locationsForSearch';

import logo from '../../images/logo.svg';

import './Header.scss';

export const Header: React.FC = () => {
  const currentLocation = useLocation();
  const { favoriteProducts } = useContext(FavContext);
  const { productsInCart } = useContext(CartContext);

  const showSearch = locationsForSearch.some(
    location => location === currentLocation.pathname,
  );

  const favItemsQuantity = useMemo(() => {
    return favoriteProducts.length;
  }, [favoriteProducts]);

  const cartItemsQuantity = useMemo(() => {
    return productsInCart.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.quantity;
    }, 0);
  }, [productsInCart]);

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo">
          <img src={logo} alt="logo" />
        </Link>

        <ul className="header__menu">
          <li className="header__item">
            <NavLink
              to="/"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Home
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/phones"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Phones
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/tablets"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Tablets
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/accessories"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header__buttons">
        {showSearch && <Search />}
        <NavLink to="/favorites" className="header__button header__button--fav">
          <span className={cn('header__quantity', {
            active: favItemsQuantity > 0,
          })}
          >
            {favItemsQuantity}
          </span>
        </NavLink>
        <NavLink to="/cart" className="header__button header__button--cart">
          <span className={cn('header__quantity', {
            active: cartItemsQuantity > 0,
          })}
          >
            {cartItemsQuantity}
          </span>
        </NavLink>
      </div>
    </header>
  );
};
