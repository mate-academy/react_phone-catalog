import React, { useContext } from 'react';
import styles from './Header.module.scss';
import { Navigation } from './components/Navigation';
import { TopBar } from '../TopBar';
import { Menu } from './components/Menu';
import { HeaderContext } from './context/HeaderContext';

export const Header = () => {
  const { showNavigation } = useContext(HeaderContext);

  return (
    <>
      <header className={`${styles.header}`} id="header">
        <TopBar />

        <div className={styles.header__navigation}>
          <Navigation />
        </div>
      </header>

      {showNavigation && <Menu />}
    </>
  );
};
