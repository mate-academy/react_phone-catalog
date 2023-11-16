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
        <ul className="top-bar__pages">
          <li className="top-bar__page">
            <a className="top-bar__link top-bar__link--active" href="/">Home</a>
          </li>
          <li className="top-bar__page">
            <a className="top-bar__link" href="/">Phones</a>
          </li>
          <li className="top-bar__page">
            <a className="top-bar__link" href="/">Tablets</a>
          </li>
          <li className="top-bar__page">
            <a className="top-bar__link" href="/">Accessories</a>
          </li>
        </ul>
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
