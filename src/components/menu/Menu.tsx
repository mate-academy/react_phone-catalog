import React from 'react';

export const Menu: React.FC = () => {
  return (
    <div className="burger-menu">
      <header className="header">
        <a className="logo" href="#">
          <img className="logo__image" alt="logo" src="/icons/logo/Logo.png" />
        </a>
        <div className="header__buttons">
          <button className="header__menu-button">
            <img
              className="header__icon"
              alt="close"
              src="/icons/close/Close.png"
            />
          </button>
        </div>
      </header>
      <div className="container">
        <div className="burger-menu__content">
          <nav className="burger-menu__navigation">
            <ul className="burger-menu__list">
              <li className="burger-menu__item burger-menu__item--underline">
                <a href="#" className="burger-menu__link text-uppercase">
                  home
                </a>
              </li>
              <li className="burger-menu__item">
                <a href="#" className="burger-menu__link text-uppercase">
                  Phones
                </a>
              </li>
              <li className="burger-menu__item">
                <a href="#" className="burger-menu__link text-uppercase">
                  tablets
                </a>
              </li>
              <li className="burger-menu__item">
                <a href="#" className="burger-menu__link text-uppercase">
                  accessories
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="burger-menu__buttons">
        <button className="burger-menu__button burger-menu__button--underline">
          <img
            className="burger-menu__icon"
            alt="like"
            src="/icons/heart/Heart.png"
          />
        </button>
        <button className="burger-menu__button">
          <img
            className="burger-menu__icon"
            alt="Cart"
            src="/icons/cart/Cart.png"
          />
        </button>
      </div>
    </div>
  );
};
