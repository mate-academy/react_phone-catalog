import React from 'react';

import { FavButton } from '../Buttons/FavButton';
import { CartButton } from '../Buttons/CardButton';
import { Logo } from '../Logo/Logo';

export const Header: React.FC = () => {
  return (
    <div className="header" id="headerNavBar">
      <nav className="header__nav">
        <Logo />

        <ul className="header__menu">
          <li className="header__item">
            <a
              href="/"
              className="header__link"
            >
              Home
            </a>
          </li>
          <li className="header__item">
            <a
              href="/phones"
              className="header__link"
            >
              Phones
            </a>
          </li>
          <li className="header__item">
            <a
              href="/tablets"
              className="header__link"
            >
              Tablets
            </a>
          </li>
          <li className="header__item">
            <a
              href="/accessories"
              className="header__link"
            >
              Accessories
            </a>
          </li>
        </ul>
      </nav>

      <div className="header__buttons">
        <FavButton />
        <CartButton />
      </div>
    </div>
  );
};
