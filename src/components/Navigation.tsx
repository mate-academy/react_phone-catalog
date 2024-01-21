// import React from 'react';
import Logo from '../img/logo.svg';
import Search from '../img/Search.svg';
import Favorite from '../img/favourites.svg';
import Basket from '../img/group.svg';

/* eslint-disable jsx-a11y/anchor-is-valid */

export const Navigation = () => {
  return (
    <header className="header">
      <a>
        <img src={Logo} className="header__logo" alt="logo" />
      </a>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__list__row">
            <a href="#" className="nav__list__row__link">home</a>
          </li>
          <li>
            <a href="#" className="nav__list__row__link">Phones</a>
          </li>
          <li>
            <a href="#" className="nav__list__row__link">tablets</a>
          </li>
          <li>
            <a href="#" className="nav__list__row__link">accessories</a>
          </li>
        </ul>
      </nav>
      <label className="header__search">
        <input
          type="text"
          placeholder="Search in phones..."
          className="header__search__input"
        />
        <a
          href=""
          className="header__link"
        >
          <img
            src={Search}
            className="header__link-icon"
            alt="Search"
          />
        </a>
      </label>
      <div className="header__link favorites">
        <a
          href=""
          className=""
        >
          <img
            src={Favorite}
            className="header__link-icon"
            alt="Favorite"
          />
        </a>
      </div>
      <div className="header__link basket">
        <a
          href=""
          className=""
        >
          <img
            src={Basket}
            className="header__link-icon"
            alt=""
          />
        </a>
      </div>
    </header>
  );
};
