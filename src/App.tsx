import { Outlet } from 'react-router-dom';

import styles from './App.module.scss';

import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import React, { useEffect, useState } from 'react';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
type Props = {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const AppContent: React.FC<Props> = ({ isMenuOpen, openMenu, closeMenu }) => {
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  return (
    <div className={styles.app} id="top">
      <h1 className={`${styles.app__title}`}>Product Catalog</h1>
      <div className={styles.app__header}>
        <Header onMenuClick={openMenu} closeMenu={closeMenu} />
      </div>
      <div
        className={`${styles.app__menu} ${
          isMenuOpen ? styles['app__menu--open'] : ''
        }`}
      >
        <Menu closeMenu={closeMenu} />
      </div>
      <main className={styles.app__container}>
        <Outlet />
      </main>
      <div className={styles.app__footer}>
        <Footer />
      </div>
    </div>
  );
};

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CartProvider>
          <AppContent
            isMenuOpen={isMenuOpen}
            openMenu={openMenu}
            closeMenu={closeMenu}
          />
        </CartProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};
