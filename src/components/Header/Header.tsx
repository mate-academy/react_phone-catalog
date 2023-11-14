import React from 'react';
import logo from '../../images/logo.svg';
import favourites from '../../images/favourites-hart-like.svg';
import bag from '../../images/shopping-bag.svg';

export const Header: React.FC = () => {
  return (
    <header className="header top-bar">
      <div className="top-bar__nav">
        <img className="logo" src={logo} alt="Logo" />
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/">Phones</a>
          <a href="/">Tablets</a>
          <a href="/">Accessories</a>
        </nav>
      </div>
      <div className="top-bar__options">
        <img src={favourites} alt="favourites" />
        <img src={bag} alt="shopping bag" />
      </div>
    </header>
  );
};
