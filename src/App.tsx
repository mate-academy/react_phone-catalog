import { Outlet } from 'react-router-dom';

import styles from './App.module.scss';

import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { useState } from 'react';
import { FavoritesProvider } from './context/FavoritesContext';

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
    <FavoritesProvider>
      <CartProvider>
        <div className={styles.app} id="top">
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
      </CartProvider>
    </FavoritesProvider>
  );
};
