import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import { Nav } from '../Nav';
import { Search } from '../Search';

export const Header = () => (
  <header className="Header">
    <Link to="/" className="Header__Logo">
      <img src="/images/logo.svg" alt="Logo" />
    </Link>
    <Nav />
    <Search />
    <Link to="/favorites" className="Header__Button">
      <div className="Icon__image Icon__image--favorites" />
    </Link>
    <Link to="/cart" className="Header__Button">
      <div className="Icon__image Icon__image--shopping-bag" />
    </Link>
  </header>
);
