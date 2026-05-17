import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Aside } from './components/Aside/Aside';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { useTranslation } from 'react-i18next';
import styles from './App.module.scss'; // Імпортуємо як styles

export const App = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <CartProvider>
      <div className={styles.app}>
        {' '}
        {/* Використовуємо styles.app */}
        <Navbar
          onBurgerClick={openMenu}
          currentLang={i18n.language}
          onChangeLang={changeLanguage}
        />
        <Aside isOpen={isMenuOpen} onClose={closeMenu} />
        <main className={styles.app__main}>
          {' '}
          {/* Використовуємо styles.app__main */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};
