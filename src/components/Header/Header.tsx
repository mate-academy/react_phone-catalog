import React from 'react';
import './Header.scss';
import { NavLink, Route, Link } from 'react-router-dom';
import Search from '../Search/Search';

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
      <Link to="/" className="header__logo logo">
        <img src="./img/logo/LOGO.svg" alt="logo" />
      </Link>

      <nav className="header__nav nav">
        <ul className="nav__list">
          {navList.map(item => (
            <li key={item.title} className="nav__item">
              <NavLink to={item.link} className="nav__link" activeClassName="nav__link--active">{item.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="header__wrapButtons">
        <Route path={['/phones', '/tablets', '/accessories', '/favorites']}>
          <Search />
        </Route>
        <button type="button" className="header__buttons favourites">
          <img src="./img/Icons/heart.svg" alt="heart" />
        </button>
        <button type="button" className="header__buttons cart">
          <img src="./img/Icons/shoppingBag.svg" alt="shoppingBag" />
        </button>
      </div>
    </header>
  );
};

export default Header;
