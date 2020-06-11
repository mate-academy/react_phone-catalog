import React from 'react';
import './Header.scss';
import { NavLink, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from '../Search/Search';
import { getFavorites } from '../../store/index';


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
  const favoriteProducts = useSelector(getFavorites);
  const counter = favoriteProducts.length;

  return (
    <header className="Header">
      <Link to="/" className="Header__Logo Logo">
        <img
          src="./img/logo/LOGO.svg"
          alt="logo"
          className="Header__LogoImg"
        />
      </Link>

      <nav className="Header__Nav Nav">
        <ul className="Nav__List">
          {navList.map(item => (
            <li key={item.title} className="Nav__Item">
              <NavLink
                to={item.link}
                className="Nav__Link"
                activeClassName="nav__link--active"
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="Header__WrapButtons">
        <Route path={['/phones', '/tablets', '/accessories', '/favorites']}>
          <Search />
        </Route>
        <Link to="/favorites" className="Header__Buttons Favourites">
          {counter !== 0 && (
            <span className="Counter">{counter}</span>
          )}
        </Link>
        <button type="button" className="Header__Buttons Cart">
          <img src="./img/Icons/shoppingBag.svg" alt="shoppingBag" />
        </button>
      </div>
    </header>
  );
};

export default Header;
