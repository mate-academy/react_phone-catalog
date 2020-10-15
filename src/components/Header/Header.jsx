import React from 'react';
import { NavLink } from 'react-router-dom';
export const Header = () => {

  return (
    <header className="header">
      <nav className="nav header__nav">
        <div className="logo nav__logo"></div>
        <ul className="nav__list nav__list_header">
          <li className="nav__item">
            <a href="#home" className="nav__link">Home</a>
          </li>
          <li className="nav__item">
            <NavLink to="/phones/" className="nav__link">
              Phones
          </NavLink>


          </li>
          <li className="nav__item">
            <a href="#tablets" className="nav__link">Tablets</a>
          </li>
          <li className="nav__item">
            <a href="#accessories" className="nav__link">Accessories</a>
          </li>
        </ul>
      </nav>

      <button className="icon-container header__icon-container header__icon-container-favorites">
        <a href="#" className="icon-container__icon icon-container__icon_favorites"></a>
      </button>
      <button className="icon-container header__icon-container">
        <a href="#cart" className="icon-container__icon icon-container__icon_shopping-cart"></a>
      </button>
    </header>
  )
}