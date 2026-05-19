import React from 'react';
import styles from './Header.module.scss';

import { Logo } from '../shared/Logo';
import { HeaderIcons } from './components/HeaderIcons/HeaderIcons';
import { Menu } from './components/Menu/Menu';

type Props = {
  toggleBurger: () => void;
  isBurgerOpen: boolean;
};

export const Header: React.FC<Props> = ({ toggleBurger, isBurgerOpen }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__logo}>
          <Logo />
        </div>

        <nav className={styles.header__nav}>
          <Menu />
        </nav>
      </div>

      <div className={styles.header__subMenuWrapper}>
        <HeaderIcons toggleBurger={toggleBurger} isBurgerOpen={isBurgerOpen} />
      </div>
    </header>
  );
};
