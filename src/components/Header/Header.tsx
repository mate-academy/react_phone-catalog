import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="Header">
      <div className="Header__content">
        <div className="Header__logo-and-nav">
          <Logo />
          <Navbar />
        </div>

        <div className="Header__fav-and-cart">
          <NavLink
            to="/favorites"
            className={({ isActive }) => classNames('icon icon--fav', {
              'icon--active': isActive,
            })}
          />
          <NavLink
            to="/cart"
            className={({ isActive }) => classNames('icon icon--cart', {
              'icon--active': isActive,
            })}
          />
        </div>
      </div>
    </div>
  );
};
