/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { CartProduct } from '../types/CartProduct';
import '../styles/header.scss';

export const Header: FC = () => {
  const foundCart
  = JSON.parse(localStorage.getItem('carts') || '').filter((item: CartProduct) => item.id);
  const likes = JSON.parse(localStorage.getItem('favorites') || '').length;
  const [cartlist, setCartList] = useState(foundCart);

  useEffect(() => {
    setCartList(foundCart);
  }, [foundCart]);

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
          {likes > 0 && (
            <span className="header__counter">{likes}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className="header__icon"
        >
          <img src="./img/icons/Cart.svg" alt="cart" />

          {foundCart.length > 0 && (
            <span className="header__counter">{cartlist.length}</span>
          )}
        </NavLink>
      </div>

    </header>
  );
};
