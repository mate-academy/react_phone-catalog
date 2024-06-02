import React from 'react';
import BurgerMenu from '../ui/burger/BurgerMenu';
import './HeaderStyles.scss';
import Favourite from '../ui/ActiveIcons/Favourite/Favourite';
import Cart from '../ui/ActiveIcons/Cart/Cart';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="icons/Logo.png" alt="logo" className="header__logoImg" />
      </div>
      <div className="header__wrapper-Menu">
        <nav className="header__menu">
          <ul className="header__menu--wrapper">
            <li className="header__menu--item">
              <Link to="/">HOME</Link>
            </li>
            <li className="header__menu--item">
              <Link to="phones">PHONES</Link>
            </li>
            <li className="header__menu--item">
              <Link to="tablets">TABLETS</Link>
            </li>
            <li className="header__menu--item">
              <Link to="accessories">ACCESSORIES</Link>
            </li>
          </ul>
        </nav>

        <div className="header__buttons">
          <Link className="header__buttons--favorite" to="favourite">
            <Favourite />
          </Link>
          <Link className="header__buttons--cart" to="cart">
            <Cart />
          </Link>
        </div>
      </div>

      <BurgerMenu />
    </header>
  );
};

export default Header;
