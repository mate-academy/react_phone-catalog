import React from 'react';

import { Logo } from './Logo';
import { Nav } from './Nav';
import { Favorites } from './Favorites';
import { Cart } from './Cart';
import { Search } from './Search';
import { useSearch } from './hooks/useSearch';


export const Header = () => {
  const {
    inputValue,
    searchProducts,
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
          />
        )}
        <Favorites />
        <Cart />
      </div>
    </header>
  );
};
