import React, { useCallback, useState } from 'react';

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

  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);

  const ref = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
      setLeft(node.getBoundingClientRect().x);
    }
  }, []);

  return (
    <header className="header">
      <div className="header__flex-wrap">
        <div className="header__logo">
          <Logo />
        </div>
        <div className="header__nav">
          <Nav headerItemRef={ref} />
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
        <Favorites headerItemRef={ref} />
        <Cart headerItemRef={ref} />
      </div>
      <span className="header__active-element"
            style={{ width: `${width}px`, left: `${left}px` }}
      />
    </header>
  );
};
