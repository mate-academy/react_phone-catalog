import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Nav } from '../Nav/Nav';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src="./LOGO.svg" alt="logo" />
      </Link>
      <Nav />
      <Route path="/:all">
        <input
          className="header__input"
          type="text"
        />
      </Route>
      <Link to="/favorites">FAV</Link>
      <Link to="/card">CARD</Link>

    </header>
  );
};
