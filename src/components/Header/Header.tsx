import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from '../Search';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { Favorites } from '../Favorites';
import { Cart } from '../Cart';
import './Header.scss';
import { MenuButton } from '../MenuButton/MenuButton';
import { Menu } from '../Menu';
import { SearchContext } from '../../helpers/utils/searchContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const [whereIsSearch, setWhereIsSearch] = useState('');
  const [hasMenu, setHesMenu] = useState(false);
  const { canSearch } = useContext(SearchContext);

  useEffect(() => {
    const path = location.pathname;

    const regex = /^\/shop/;

    if (regex.test(path)) {
      setWhereIsSearch('shop');
    } else if (path === '/favorites') {
      setWhereIsSearch('favorites');
    } else {
      setWhereIsSearch('');
    }
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="header__right">
        <Logo />

        <div className="header__nuv">
          <Nav />
        </div>
      </div>

      <div className="header__left">
        <div className="header__search">
          {whereIsSearch && canSearch && (
            <Search whereIsSearch={whereIsSearch} />
          )}
        </div>

        <div className="header__FavCart">
          <Favorites />
          <Cart />
        </div>
      </div>

      <div className="header__menu-button">
        <MenuButton hasMenu={hasMenu} setHesMenu={setHesMenu} />
      </div>

      <Menu hasMenu={hasMenu} setHesMenu={setHesMenu} />
    </header>
  );
};
