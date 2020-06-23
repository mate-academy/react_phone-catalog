import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Favourite } from '../Favourite/Favourite';
import { Cart } from '../Cart/Cart';
import { Search } from '../Search/Search';

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
              <NavLink className="list__link" to="/phones">Рhones</NavLink>
            </li>
            <li className="list__item">
              <NavLink className="list__link" to="/tablets">Tablets</NavLink>
            </li>
            <li className="list__item">
              <NavLink className="list__link" to="/accessories">Accessories</NavLink>
            </li>
          </ul>
          <ul className="list">
            <Route path={['/phones', '/tablets', '/accessories']} exact>
              <Search />
            </Route>
            <Favourite />
            <Cart />
          </ul>
        </nav>
      </div>
    </header>
  </>
);
