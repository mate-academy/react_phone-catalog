import React from 'react';
import './Header.scss';
import '../../helpers/grid.scss';

import { Favourites } from '../Favourites';
import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav';
import { ShoppingBag } from '../ShoppingBag';
import { Search } from '../Search';
// import { Product } from '../../types/Product';

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
          {!isCartPageOpen && <Favourites />}
          <ShoppingBag />
        </div>
      </div>
    </header>
  );
};
