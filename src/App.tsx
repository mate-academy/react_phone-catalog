import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './modules/HomePage';
import CartPage from './modules/CartPage';
//eslint-disable-next-line max-len
import ProductDetails from './modules/ProductDetails/ProductDetails';
import FavoritesPage from './modules/FavoritesPage';
import NotFoundPage from './modules/NotFoundPage/NotFoundPage';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
//import './App.module.scss';
import Footer from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
};
