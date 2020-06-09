import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search } from '../Search/Search';
import { Nav } from '../Nav/Nav';
import './Header.scss';
import { getProducts } from '../../store/index';

export const Header = () => {
  const products = useSelector(getProducts);
  const favorietsLength = products.filter((product: Products) => product.favorites).length;

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src="./LOGO.svg" alt="logo" />
        </Link>
        <Nav />
      </div>
      <div className="header__right">
        <Route path="/:all">
          <div className="search header__search">
            <img src="./img/search.svg" alt="heart_icon" className="search__icon" />
            <Search />
          </div>
        </Route>
        <Link to="/favorites">
          <button
            type="button"
            className="header__button"
          >
            <img src="./img/heart.svg" alt="heart_icon" className="" />
            {favorietsLength > 0
            && <span className="header__favourites">{favorietsLength}</span>}
          </button>
        </Link>
        <Link to="/card">
          <button
            type="button"
            className="header__button"
          >
            <img src="./img/shopingBag.svg" alt="shopping_icon" className="" />
          </button>
        </Link>
      </div>

    </header>
  );
};
