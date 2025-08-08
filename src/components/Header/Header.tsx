import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <img className="header__logo" src="/img/logo-img.svg" alt="logo image" />
      <div className="header__container">
        <nav className="header__nav">
          <Link to="/" className="header__link header__link--home">
            HOME
          </Link>
          <Link to="#" className="header__link">
            PHONES
          </Link>
          <Link to="#" className="header__link">
            TABLETS
          </Link>
          <Link to="#" className="header__link">
            ACCESSORIES
          </Link>
        </nav>
        <div className="header__button">
          <Link to="#" className="header__button-link">
            <img src="/img/icons/icon-favourites.svg" alt="favourites" />
          </Link>
          <Link to="#" className="header__button-link">
            <img src="/img/icons/icon-cart.svg" alt="cart" />
          </Link>
        </div>
      </div>
    </header>
  );
};
