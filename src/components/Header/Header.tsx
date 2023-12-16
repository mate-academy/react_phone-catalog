import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import { NavBar } from '../NavBar/NavBar';
import { Search } from '../Search/Search';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const curPage = pathname.split('/')[1];
  const shouldSearch = curPage === 'phones'
    || curPage === 'tablets'
    || curPage === 'accessories'
    || curPage === 'favorites';

  const headerLinks = ['home', 'phones', 'tablets', 'accessories'];

  return (
    <header className="header" id="top">
      <div className="header__content">
        <div className="header__left">
          <Link className="header__logo" to="/" />

          <NavBar links={headerLinks} />
        </div>

        <div className="header__icons">
          {shouldSearch && (<Search page={curPage} />)}

          <ButtonIcon
            type="event"
            shape="heart"
            path="/"
            dynamicClasses={['shadow', 'big']}
          />

          <ButtonIcon
            type="event"
            shape="cart"
            path="/"
            dynamicClasses={['shadow', 'big']}
          />
        </div>
      </div>
    </header>
  );
};
