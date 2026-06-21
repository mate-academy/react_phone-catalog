/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { HeaderLogo } from './components/HeaderLogo';
import { HeaderNavigation } from './components/HeaderNavigation';
import { HeaderActions } from './components/HeaderActions';
import { SearchInput } from '../SearchInput';
import { BurgerMenu } from './components/BurgerMenu';

import styles from './Header.module.scss';
//#endregion

//#region STYLES
const { header } = styles;
//#endregion

export const Header = () => {
  //#region STATE
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  //#endregion

  //#region SEARCH-INPUT_LOGIC
  const searchAllowedPaths = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favourites',
  ];

  const isSearchVisible = searchAllowedPaths.includes(pathname);
  //#endregion

  //#region EFFECTS
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);
  //#endregion

  //#region RENDER
  return (
    <div className={header}>
      <HeaderLogo />

      <HeaderNavigation />

      {isSearchVisible && <SearchInput key={pathname} />}

      <HeaderActions onMenuClick={() => setIsMenuOpen(true)} />

      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
  //#endregion
};
