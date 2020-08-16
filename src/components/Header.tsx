import React, { FC } from 'react';
import {
  HashRouter,
} from 'react-router-dom';

const Header: FC = () => {
  return (
    <HashRouter>
      <nav className="nav">
        <img
          src={`${window.location.origin}/img/logo.svg`}
          alt="Logo"
          className="nav__logo"
        />
        <ul className="nav__links">
          <li className="nav__items">Home</li>
          <li className="nav__items">Phones</li>
          <li className="nav__items">Tablets</li>
          <li className="nav__items">Accessories</li>
        </ul>
        <div className="nav__fav-cart-container">
          <img
            src={`${window.location.origin}/img/favourites.svg`}
            alt="Favourites"
            className="nav__favourites"
          />
          <img
            src={`${window.location.origin}/img/shopping-bag.svg`}
            alt="Shopping bag"
            className="nav__shopping-bag"
          />
        </div>
      </nav>
    </HashRouter>
  );
};

export default Header;
