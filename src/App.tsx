/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeContext } from './utils/themeContext';
import styles from './App.module.scss';
import { TopBar } from './components/TopBar';
import { Menu } from './components/Menu';
import { HomePage } from './pages/HomePage';
import { RedirectHome } from './pages/HomePage/RedirectHome';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { FavoritePage } from './pages/FavoritePage';
import { DetailPage } from './pages/DetailedPage';
import { CardPage } from './pages/CartPage';
import { Theme } from '../public/api/types/theme';
import { Footer } from './components/Footer';

export const App = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (isMenuOpen) {
      setMenuOpen(false);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div
      className={[
        styles.app,
        theme === Theme.LIGHT ? styles['app--light'] : '',
      ].join(' ')}
    >
      <TopBar isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <Menu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <main className={styles.app__section}>
        <div className={styles.app__container}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<RedirectHome />} />
            <Route path=":category">
              <Route index element={<CatalogPage />} />
              <Route path=":nameId" element={<DetailPage />} />
            </Route>
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/cart" element={<CardPage />} />
            <Route
              path="*"
              element={
                <div className={styles.app__notFound}>
                  <h1 className={styles.app__notFound__title}>
                    Page not found
                  </h1>
                  <img
                    src="/img/page-not-found.png"
                    alt="404"
                    className={styles.app__notFound__img}
                  />
                </div>
              }
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};
