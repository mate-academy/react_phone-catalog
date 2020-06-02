import React, { useMemo } from 'react';

import { Logo } from '../Logo/Logo';
import { Nav } from './Nav';
import { Favorites } from './Favorites';
import { Cart } from './Cart';
import { Search } from './Search';
import { useSearch } from '../_hooks/useSearch';
import { LOCATIONS } from '../../common/constants';
import { useRouter } from '../_hooks/useRouter';

export const Header = () => {
  const { inputValue, searchProducts, searchReset } = useSearch();
  const { location } = useRouter();

  const path = location.pathname;

  const searchInputIsHidden = useMemo(() => (
    (path === LOCATIONS.phones)
    || (path === LOCATIONS.tablets)
    || (path === LOCATIONS.favorites)
  ), [path]);

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
        {searchInputIsHidden && (
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
