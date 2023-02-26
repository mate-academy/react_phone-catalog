/* eslint-disable max-len */
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import '../styles/header.scss';

export const Header: FC = () => {
  const fav = JSON.parse(localStorage.getItem('favorites') || '').length;
  const cart = JSON.parse(localStorage.getItem('carts') || '').length;

  return (
    <header className="header">
      <div className="header-left">
        <Logo />
        <Navbar />
      </div>
      <div className="header-right">
        <NavLink
          to="/favorites"
          className="header__icon"
        >
          <img src="./img/icons/Like.svg" alt="favorites" />
          {fav > 0 && (
            <span className="header__counter">{fav}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className="header__icon"
        >
          <img src="./img/icons/Cart.svg" alt="cart" />

          {cart > 0 && (
            <span className="header__counter">{cart}</span>
          )}
        </NavLink>
      </div>

    </header>
  );
};
