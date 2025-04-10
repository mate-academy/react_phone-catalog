/* eslint-disable max-len */
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './modules/header';
import { HomePage } from './modules/homePage';
import { Footer } from './modules/footer';
import { ProductsList } from './modules/productsList';
import { ProductDetailsPage } from './modules/productDetailsPage';
import { FavoritesPage } from './modules/favorites';
import { useState } from 'react';
import { Aside } from './modules/aside';
import { FavoritesProvider } from './components/favoritesContext/favoritesContext';
import { NotFoundPage } from './modules/notFoundPage';
import { CartProvider } from './components/cartContext/cartContext';
import { CartPage } from './modules/cartPage';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <CartProvider>
        <FavoritesProvider>
          <h1 className="productCatalog">Product Catalog</h1>
          <Aside setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/phones"
              element={<ProductsList category="phones" />}
            />
            <Route
              path="/tablets"
              element={<ProductsList category="tablets" />}
            />
            <Route
              path="/accessories"
              element={<ProductsList category="accessories" />}
            />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </FavoritesProvider>
      </CartProvider>
    </Router>
  );
};
