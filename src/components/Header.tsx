import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import '../styles/header.scss';

export const Header: FC = () => {
  const cartCounter = () => {
    let counter = [];

    if (localStorage.getItem('cart')) {
      counter = JSON.parse(localStorage.getItem('cart') || '');
    }

    if (counter.length) {
      return (
        <span className="header__counter">
          {counter.length}
        </span>
      );
    }

    return '';
  };

  const favCounter = () => {
    let counter = [];

    if (localStorage.getItem('favourite')) {
      counter = JSON.parse(localStorage.getItem('favourite') || '');
    }

    if (counter.length) {
      return (
        <span className="header__counter">
          {counter.length}
        </span>
      );
    }

    return '';
  };

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
          {favCounter()}
        </NavLink>
        <NavLink
          to="/cart"
          className="header__icon"
        >
          <img src="./img/icons/Cart.svg" alt="cart" />

          {cartCounter()}
        </NavLink>
      </div>

    </header>
  );
};
