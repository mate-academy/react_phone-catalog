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
  const foundFav
  = JSON.parse(localStorage.getItem('favorites') || '').map((item: string) => item);
  const [cartlist, setCartList] = useState(foundCart);
  const [favlist, setFavList] = useState(foundFav);

  useEffect(() => {
    setCartList(foundCart);
  }, [foundCart]);

  useEffect(() => {
    setFavList(foundFav);
  }, [foundFav]);

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
          {foundFav.length > 0 && (
            <span className="header__counter">{favlist.length}</span>
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
