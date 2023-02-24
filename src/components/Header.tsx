/* eslint-disable max-len */
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import '../styles/header.scss';
import { CartProduct } from '../types/CartProduct';

export const Header: FC = () => {
  const fav = JSON.parse(localStorage.getItem('favorites') || '').map((item: string) => item);
  const cart = JSON.parse(localStorage.getItem('carts') || '').filter((item: CartProduct) => item.id);

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
          {fav.length > 0 && (
            <span className="header__counter">{fav.length}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className="header__icon"
        >
          <img src="./img/icons/Cart.svg" alt="cart" />

          {cart.length > 0 && (
            <span className="header__counter">{cart.length}</span>
          )}
        </NavLink>
      </div>

    </header>
  );
};
