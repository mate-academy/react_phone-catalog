import React from 'react';
import './Header.scss';
import { NavLink, Route } from 'react-router-dom';

const navList = [
  {
    title: 'home',
    link: '/home',
  },
  {
    title: 'Phones',
    link: '/phones',
  },
  {
    title: 'tablets',
    link: '/tablets',
  },
  {
    title: 'accessories',
    link: '/accessories',
  },
];

const Header = () => {
  return (
    <header className="header">
      <a href="/home" className="header__logo logo">
        <img src="../img/logo/LOGO.svg" alt="logo" />
      </a>

      <nav className="header__nav nav">
        <ul className="nav__list">
          {navList.map(item => (
            <li key={item.title} className="nav__item">
              <NavLink to={item.link} className="nav__link">{item.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Route path="/phones">
          <input type="text" />
        </Route>
        <button type="button" className="header__buttons favourites" aria-label="button" />
        <button type="button" className="header__buttons cart" aria-label="button" />
      </div>
    </header>
  );
};

export default Header;
