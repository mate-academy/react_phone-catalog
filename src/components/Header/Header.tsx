import React from 'react';
import logo from '../../images/logo.svg';
import favourites from '../../images/favourites-hart-like.svg';
import bag from '../../images/shopping-bag.svg';

export const Header: React.FC = () => {
  return (
    <header className="header top-bar">
      <div className="top-bar__nav">
        <a className="top-bar__links" href="/">
          <img className="logo" src={logo} alt="Logo" />
        </a>
        <nav className="top-bar__links">
          <a className="top-bar__link top-bar__link--active" href="/">Home</a>
          <a className="top-bar__link" href="/">Phones</a>
          <a className="top-bar__link" href="/">Tablets</a>
          <a className="top-bar__link" href="/">Accessories</a>
        </nav>
      </div>
      <div className="top-bar__options">
        <a className="top-bar__option" href="/">
          <img className="icon" src={favourites} alt="favourites" />
        </a>

        <a className="top-bar__option" href="/">
          <img className="icon" src={bag} alt="shopping bag" />
        </a>
      </div>
    </header>
  );
};
