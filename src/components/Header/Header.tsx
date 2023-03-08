import React from 'react';
import './Header.scss';
import '../../styles/grid.scss';

import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav/Nav';
import { Search } from '../Search/Search';
import { FavoritesIcon } from '../FavoritesIcon/FavoritesIcon';
import { ShoppingBag } from '../ShoppingBag/ShoppingBag';

type Props = {
  search?: string;
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
  isCartPageOpen?: boolean;
};

export const Header: React.FC<Props> = ({
  search,
  setQuery,
  isCartPageOpen,
}) => {
  return (
    <header className="header">
      <div className="header__top-action">
        <div className="header__links-wrapper">
          <Logo />
          {!isCartPageOpen && <Nav />}
        </div>

        <div className="header__links-wrapper">
          {search && setQuery && <Search text={search} setQuery={setQuery} />}
          {!isCartPageOpen && <FavoritesIcon />}
          <ShoppingBag />
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  search: '',
  setQuery: undefined,
  isCartPageOpen: false,
};
