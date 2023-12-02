import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import { NavIcons } from '../NavIcons/NavIcons';
import { Search } from '../Search/Search';

import './Header.scss';

export const Header: FC = () => {
  const { pathname } = useLocation();
  const path = pathname.slice(1);

  const isShowSearchInput = pathname.slice(1) === 'phones'
    || pathname.slice(1) === 'tablets'
    || pathname.slice(1) === 'accessories'
    || pathname.slice(1) === 'favorites';

  return (
    <header className="header">
      <div className="nav-container">
        <NavBar />
      </div>

      <div className="header__interactive">
        {isShowSearchInput && (
          <div className="header__search">
            <Search
              placeholder={`Search in ${path}...`}
            />
          </div>
        )}

        <div className="icons-container">
          <NavIcons />
        </div>
      </div>
    </header>
  );
};
