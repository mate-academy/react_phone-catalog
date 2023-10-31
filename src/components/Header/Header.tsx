import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import './Header.scss';
import { Search } from '../Search';

export const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="Header">
      <div className="Header__content">
        <div className="Header__logo-and-nav">
          <Logo />
          <Navbar />
        </div>

        <div className="Header__fav-and-cart">
          {(pathname === '/phones'
            || pathname === '/tablets'
            || pathname === '/accessories'
            || pathname === '/favorites') && (
            <Search />
          )}
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
