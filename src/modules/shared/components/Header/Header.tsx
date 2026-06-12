/* eslint-disable prettier/prettier */
//#region IMPORTS
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { HeaderLogo } from './components/HeaderLogo';
import { HeaderNavigation } from './components/HeaderNavigation';
import { HeaderActions } from './components/HeaderActions';

import styles from './Header.module.scss';
import { BurgerMenu } from './components/BurgerMenu';
//#endregion

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <div className={styles.header}>
      <HeaderLogo />
      <HeaderNavigation />
      <HeaderActions
        onMenuClick={() => setIsMenuOpen(true)}
      />
      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
};
