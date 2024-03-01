import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

import '../styles/Header.scss';
import '../styles/logo.scss';
import { FavCart } from './FavCart';

export const Header: React.FC = () => {
  return (
    <header className="header" id="header">
      <div className="header__left-block">
        <Link to="/" className="logo" />

        <Navigation />
      </div>

      <div className="header__right-block">
        <FavCart />
      </div>
    </header>
  );
};
