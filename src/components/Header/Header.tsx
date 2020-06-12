import React from 'react';
import { NavLink } from 'react-router-dom';
import { Favourite } from '../Favourite/Favourite';
import { Cart } from '../Cart/Cart';

export const Header = () => (
  <>
    <header className="header">
      <div className="header__container">
        <nav className="header__nav">
          <ul className="list">
            <li className="list__item">
              <NavLink className="list__link logo" to="/">
                <img className="logo__img" src="./img/LOGO.svg" alt="company logo" />
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink className="list__link" to="/">Home</NavLink>
            </li>
            <li className="list__item">
              <NavLink className="list__link" to="/phones">phones</NavLink>
            </li>
            <li className="list__item">
              <NavLink className="list__link" to="/tablets">tablets</NavLink>
            </li>
            <li className="list__item">
              <NavLink className="list__link" to="/accessories">accessories</NavLink>
            </li>
          </ul>
          <ul className="list">
            <Favourite />
            <Cart />
            {/* <NavLink to="/bag">
              <li className="nav nav__bag" />
            </NavLink> */}
          </ul>
        </nav>
      </div>
    </header>
  </>
);
