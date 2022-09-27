import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Nav } from '../Nav';
import { Logo } from '../Logo';
import { useCounter } from '../Context/Context';
import { SearchPanel } from '../SearchPanel';

import './Header.scss';

export const Header: React.FC = () => {
  const [isVisibleSearch, setIsVisibleSearch] = useState<boolean>(true);
  const [isVisibleNav, setIsVisibleNav] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setIsVisibleSearch(false);
        setIsVisibleNav(true);
        break;
      case '/cart':
        setIsVisibleSearch(false);
        setIsVisibleNav(false);
        break;
      case '/phones':
      case '/tablets':
      case '/accessories':
      case '/favorites':
        setIsVisibleSearch(true);
        setIsVisibleNav(true);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const context = useCounter();

  const setActive = (
    { isActive }: { isActive: boolean },
  ) => (isActive ? 'Header__link Header__link--active' : 'Header__link');

  return (
    <div className="Header" id="header">
      <div className="Header__logo">
        <Logo />
      </div>
      <nav className="Header__nav">
        {isVisibleNav && <Nav />}
        {isVisibleSearch && <SearchPanel />}
      </nav>

      {isVisibleNav && (
        <div className="Header__like">
          <NavLink
            to="/favorites"
            className={setActive}
          >
            <span className="icon-Favourites-Heart-Like" />
            {context?.countFavorites && context?.countFavorites > 0
              ? (
                <span
                  className="Header__cart-count"
                >
                  {context?.countFavorites}
                </span>
              )
              : ''}
          </NavLink>
        </div>
      )}

      <div className="Header__cart">
        <NavLink
          to="/cart"
          className={setActive}
        >
          <span className="icon-Shopping-bag-Cart" />
          {context?.countCart && context?.countCart > 0
            ? (
              <span
                className="Header__cart-count"
              >
                {context?.countCart}
              </span>
            ) : ''}
        </NavLink>
      </div>
    </div>
  );
};
