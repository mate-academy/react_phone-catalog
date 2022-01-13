import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { Logo } from '../Logo/Logo';

import './Header.scss';

export const Header:React.FC = () => {
  let countFavorites = 0;
  let countCarts = 0;

  if (localStorage.getItem('favorites')) {
    countFavorites = JSON.parse(localStorage.getItem('favorites') || '').length;
  }

  if (localStorage.getItem('carts')) {
    countCarts = JSON.parse(localStorage.getItem('carts') || '').length;
  }

  return (
    <header className="header">
      <div className="header-left">
        <Logo />
        <Navigation />
      </div>
      <div className="header-right">
        <NavLink to="/favorites" className="header__icon">
          <img src="./img/icons/like.svg" alt="favorites" />
          {!!countFavorites && (
            <span className="header__counter">{countFavorites}</span>
          )}
        </NavLink>
        <NavLink to="/cart" className="header__icon">
          <img src="./img/icons/cart.svg" alt="cart" />
          {!!countCarts && (
            <span className="header__counter">{countCarts}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
