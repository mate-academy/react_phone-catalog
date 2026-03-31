import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './modules/HomePage/HomePage';
import { ProductsPage } from './modules/Product pages/ProductsPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavouritesPage } from './modules/FavouritesPage/FavouritesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import './App.scss';
import './theme.scss';

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

export const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    document
      .querySelector('.app')
      ?.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    document.title = 'Nice Gadgets';

    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    link.href = '/img/Favicon.svg';
  }, []);

  return (
    <div className={`app ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/phones"
            element={<ProductsPage category="phones" title="Mobile phones" />}
          />
          <Route
            path="/tablets"
            element={<ProductsPage category="tablets" title="Tablets" />}
          />
          <Route
            path="/accessories"
            element={
              <ProductsPage category="accessories" title="Accessories" />
            }
          />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/:category/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
