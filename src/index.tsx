/* eslint-disable max-len */
import { createRoot } from 'react-dom/client';

import { App } from './App';

import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import React from 'react';

import { HomePage } from './modules/HomePage/HomePage';

import { CatalogPage } from './modules/CatalogPage/CatalogPage';

// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';

import './App.scss';

import { GlobalProvider } from './components/CartContext/CartContext';

import { CartPage } from './components/CartContext/CartPage';

import { ScrollToTop } from './components/ScrollToTop';

import { FavoritesPage } from './components/Favorite/FavoritesPage';

const setFavicon = () => {
  let link: HTMLLinkElement | null =
    document.querySelector("link[rel~='icon']");

  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  link.href =
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👌</text></svg>";

  // Название вкладки (чтобы не было "Vite + React")
  document.title = 'Nice Gadgets';
};

setFavicon();

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path=":category" element={<CatalogPage />} />
          <Route path=":category/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </Router>
  </GlobalProvider>,
);
