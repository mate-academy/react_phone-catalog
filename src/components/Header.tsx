import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import '../styles/header.scss';

export const Header: FC = () => {
  const cartCounter = () => {
    const count: string | null = localStorage.getItem('cart');
    const counter = count ? JSON.parse(count) : [];

    if (counter.length) {
      return (
        <span className="header__counter">
          {counter.length}
        </span>
      );
    }

    return [];
  };

  const favCounter = () => {
    const count: string | null = localStorage.getItem('favourite');
    const counter = count ? JSON.parse(count) : [];

    if (counter.length) {
      return (
        <span className="header__counter">
          {counter.length}
        </span>
      );
    }

    return [];
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
