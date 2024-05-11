import React from 'react';
import BurgerMenu from '../burger/BurgerMenu';
import './HeaderStyles.scss';
import logo from './../../img/Icons/Logo.png';
import Favourite from '../ActiveIcons/Favourite/Favourite';
import Cart from '../ActiveIcons/Cart/Cart';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="logo" className="header__logoImg" />
      </div>
      <div className="header__wrapper-Menu">
        <nav className="header__menu">
          <ul className="header__menu--wrapper">
            <li className="header__menu--item">
              <a href="">HOME</a>
            </li>
            <li className="header__menu--item">
              <a href="">PHONES</a>
            </li>
            <li className="header__menu--item">
              <a href="">TABLETS</a>
            </li>
            <li className="header__menu--item">
              <a href="">ACCESSORIES</a>
            </li>
          </ul>
        </nav>

        <div className="header__buttons">
          <div className="header__buttons--favorite">
            <Favourite />
          </div>
          <div className="header__buttons--cart">
            <Cart />
          </div>
        </div>
      </div>

      <BurgerMenu />
    </header>
  );
};

export default Header;
