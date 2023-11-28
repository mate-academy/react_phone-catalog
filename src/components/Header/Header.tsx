/* eslint-disable @typescript-eslint/comma-dangle */
import { useContext } from 'react';
import cn from 'classnames';
import { MainContext } from '../../context/MainContext';

import { HeaderLayer } from './HeaderLayer';
import { HeaderLogo } from './HeaderLogo';
import { HeaderItems } from './HeaderItems';
import { HeaderSearch } from './HeaderSearch';
import { HeaderIcons } from './HeaderIcons';
import { HeaderBurger } from './HeaderBurger';

export const Header = () => {
  const { isMenuOpen, isHeaderSearchVisible } = useContext(MainContext);

  return (
    <header
      className={cn(
        'header',
        { 'header--menu-open': isMenuOpen },
        { 'header--search-visible': isHeaderSearchVisible }
      )}
    >
      <HeaderLayer />

      <div className="header__wrapper">
        <HeaderLogo />
        <HeaderItems />
      </div>

      <div className="header__wrapper">
        <HeaderSearch />
        <HeaderIcons />
        <HeaderBurger />
      </div>
    </header>
  );
};
