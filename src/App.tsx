import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import './i18n';
import './App.scss';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { SCREEN_SIZES } from './styles/utils/icons/screenSizes';
import { Footer } from './components/Footer';
import { ProductsPage } from './components/ProductsPages';
import { useMenuContext } from './components/MenuContext';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { ShoppingCartPage } from './components/ShoppingCartPage';
import { FavouritesPage } from './components/FavoritesPage';
import { PageNotFound } from './components/PageNotFound';
import { useThemeContext } from './ThemeContext/ThemeContext';
export const App = () => {
  const { isMenuOpen } = useMenuContext();
  const { theme } = useThemeContext();

  useEffect(() => {
    const appContainer = document.querySelector('.App');

    if (appContainer) {
      if (isMenuOpen) {
        appContainer.classList.add('menu-open');
      } else {
        appContainer.classList.remove('menu-open');
      }
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className={`App ${theme}`}>
        <Navbar />
        <MediaQuery maxWidth={SCREEN_SIZES.mobileMax}>
          <MobileMenu />
        </MediaQuery>

        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="products/:category" element={<ProductsPage />} />
          <Route path="/product">
            <Route path=":itemId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
        </Routes>
        {!isMenuOpen && <Footer />}
      </div>
    </>
  );
};
