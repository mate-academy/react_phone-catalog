/* eslint-disable max-len */
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import '../styles/header.scss';

export const Header: FC = () => {
  let likes = 0;

  const inBag = JSON.parse(localStorage.getItem('carts') || '').length;

  if (localStorage.getItem('favorites')) {
    likes = JSON.parse(localStorage.getItem('favorites') || '').length;
  }

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

          {inBag > 0 && (
            <span className="header__counter">{inBag}</span>
          )}
        </NavLink>
      </div>

    </header>
  );
};
