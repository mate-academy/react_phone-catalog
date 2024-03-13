import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Navigation } from './Navigation';

import '../styles/Header.scss';
import '../styles/logo.scss';
import { FavCart } from './FavCart';
import { Search } from './Search';

export const Header: React.FC = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const isHomeOrIsCart = pathname === '/cart' || pathname === '/';
  const isSearch = !isHomeOrIsCart && !productId;

  return (
    <header className="header" id="header">
      <div className="header__left-block">
        <Link to="/" className="logo" />

        <Navigation />
      </div>

      <div className="header__right-block">
        {isSearch && <Search />}

        <FavCart />
      </div>
    </header>
  );
};
