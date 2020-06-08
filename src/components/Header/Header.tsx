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
    <header className="Header">
      <Link to={'/'} className="Header__Logo Logo">
        <img src="./img/logo/LOGO.svg" alt="logo" />
      </Link>

      <nav className="Header__Nav Nav">
        <ul className="Nav__List">
          {navList.map(item => (
            <li key={item.title} className="Nav__Item">
              <NavLink to={item.link} className="Nav__Link" activeClassName="nav__link--active">{item.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="Header__WrapButtons">
        <Route path={['/phones', '/tablets', '/accessories', '/favorites']}>
          <Search />
        </Route>
        <button type="button" className="Header__Buttons Favourites">
          <img src="./img/Icons/heart.svg" alt="heart" />
        </button>
        <button type="button" className="Header__Buttons Cart">
          <img src="./img/Icons/shoppingBag.svg" alt="shoppingBag" />
        </button>
      </div>
    </header>
  );
};

export default Header;
