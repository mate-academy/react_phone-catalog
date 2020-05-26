import React from 'react';

import { Logo } from '../Logo/Logo';
import { Nav } from './Nav';
import { Favorites } from './Favorites';
import { Cart } from './Cart';
import { Search } from './Search';
import { useSearch } from '../_hooks/useSearch';

export const Header = () => {
  const {
    inputValue,
    searchProducts,
    searchReset,
    location,
  } = useSearch();

  return (
    <header className="header">
      <div className="header__flex-wrap">
        <div className="header__logo">
          <Logo />
        </div>
        <div className="header__nav">
          <Nav />
        </div>
      </div>
      <div className="header__flex-wrap">
        {location.pathname !== '/'
        && (
          <Search
            inputValue={inputValue}
            searchProducts={searchProducts}
            searchReset={searchReset}
          />
        )}
        <Favorites />
        <Cart />
      </div>
    </header>
  );
};
