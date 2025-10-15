import React from 'react';
import { HeaderIconButton } from './headerButtons/HeaderIconButton';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="header__navigation">
        <a className="logo" href="#">
          <img
            className="logo__image"
            alt="logo"
            src="../../../public/img/general/icons/logo.svg"
          />
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
        <HeaderIconButton icon="heart" count={100} />
        <HeaderIconButton icon="cart" count={0} />
        <button className="header__button menu">
          <img
            className="header__icon"
            alt="menu"
            src="../../../public/img/general/icons/menu.svg"
          />
        </button>
      </div>
    </header>
  );
};
