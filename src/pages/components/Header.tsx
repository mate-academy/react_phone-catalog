/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import '../../styles/blocks/header.scss';

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__content">
        <nav className="header__nav nav">
          <a href="#" className="nav__link">
            <img src="images/LOGO.png" alt="Logo" />
          </a>
          <a href="#" className="nav__link">
            home
          </a>
          <a href="#" className="nav__link">
            Phones
          </a>
          <a href="#" className="nav__link">
            tablets
          </a>
          <a href="#" className="nav__link">
            accessories
          </a>
        </nav>
        <div
          className="
          header__favorites-card-buttons
          favorites-card-buttons
          favorites
          card
          "
        >
          <a href="http://" className="favorites-card-buttons--link">
            <img
              className="favorites-card-buttons--icon"
              src="images/icons/HeartLike.svg"
              alt="Favorites"
            />
          </a>
          <a href="http://" className="favorites-card-buttons--link">
            <img
              className="favorites-card-buttons--icon"
              src="images/icons/ShoppingbagCart.svg"
              alt="Shopping bag"
            />
          </a>
        </div>
      </div>
    </header>
  );
};
