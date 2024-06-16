import React from 'react';
import './Navigation.scss';
import { Link } from 'react-router-dom';

export const Navigation: React.FC = () => {
  return (
    <nav className="nav">
      <div className="nav__content nav__box">
        <div className="nav__left">
          <Link to="/" className="icon icon--logo">
            <img src="nav/logo.svg" alt="logo" />
          </Link>

          <ul className="nav__ul">
            <li className="nav__list">
              <Link to="home" className="nav__link">
                Home
              </Link>
            </li>
            <li className="nav__list">
              <Link to="/product/phones" className="nav__link">
                Phones
              </Link>
            </li>
            <li className="nav__list">
              <Link to="/product/tablets" className="nav__link">
                Tablets
              </Link>
            </li>
            <li className="nav__list">
              <Link to="/product/accessories" className="nav__link">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav__right">
          <Link to="/" className="icon icon--block icon--favourites">
            <img src="nav/favourites.svg" alt="favourites" />
          </Link>
          <Link to="/" className="icon icon--block icon--cart">
            <img src="nav/cart.svg" alt="cart" />
          </Link>
          <Link to="/menu" className="icon icon--block icon--menu">
            <img src="nav/menu.svg" alt="menu" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
