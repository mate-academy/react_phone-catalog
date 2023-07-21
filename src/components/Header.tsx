import React from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import logo from '../imgs/LOGO.svg';

import cart from '../imgs/icons/Shopping bag (Cart).svg';

import favsIcon from '../imgs/icons/Favourites (Heart Like).svg';
import { RootState } from '../Reducer/store';

export const Header: React.FC = () => {
  const favsList = useSelector((state: RootState) => state.favorites);
  const cartList = useSelector((state: RootState) => state.cart);

  return (
    <div className="header" id="headerNavBar">
      <nav className="header__nav">
        <Link to="/" className="header__logo">
          <img src={logo} alt="" />
        </Link>

        <ul className="header__menu">
          <li className="header__item">
            <Link
              to="/"
              className="header__link"
            >
              Home
            </Link>
          </li>
          <li className="header__item">
            <Link
              to="/phones"
              className="header__link"
            >
              Phones
            </Link>
          </li>
          <li className="header__item">
            <Link
              to="/tablets"
              className="header__link"
            >
              Tablets
            </Link>
          </li>
          <li className="header__item">
            <Link
              to="/accessories"
              className="header__link"
            >
              Accessories
            </Link>
          </li>
        </ul>
      </nav>

      <div className="header__buttons">
        <Link to="/favorites">
          <button type="button" className="button button__cart" data-counter={`${favsList.length}`}>
            <img src={favsIcon} alt="" className="button__cart--image" />
          </button>
        </Link>
        <Link to="/cart">
          <button type="button" className="button button__cart" data-counter={`${cartList.length}`}>
            <img src={cart} alt="" className="button__cart--image" />
          </button>
        </Link>
      </div>
    </div>
  );
};
