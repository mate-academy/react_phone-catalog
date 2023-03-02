import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import '../styles/header.scss';
import { Context } from '../contexts/Context';

export const Header: FC = () => {
  const { cart } = useContext(Context);

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

          {cart.length > 0 && (
            <span className="header__counter">
              {cart.length}
            </span>
          )}
        </NavLink>
      </div>

    </header>
  );
};
