import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__navigation">
        <a className="logo" href="#">
          <img className="logo__image" alt="logo" src="/icons/logo/Logo.png" />
        </a>
        <ul className="header__list">
          <li className="header__item header__item--underline">
            <a href="#" className="header__link text-uppercase">
              home
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link text-uppercase">
              home
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link text-uppercase">
              home
            </a>
          </li>
          <li className="header__item">
            <a href="#" className="header__link text-uppercase">
              home
            </a>
          </li>
        </ul>
      </nav>
      <div className="header__buttons">
        <button className="header__like-button">
          <img
            className="header__icon"
            alt="like"
            src="/icons/heart/Heart.png"
          />
        </button>
        <button className="header__curt-button">
          <img className="header__icon" alt="bag" src="/icons/cart/Cart.png" />
        </button>
        <button className="header__menu-button">
          <img className="header__icon" alt="menu" src="/icons/menu/Menu.png" />
        </button>
      </div>
    </header>
  );
};
