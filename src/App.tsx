import React from 'react';
import './index.scss';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ProductList } from './components/ProductList/ProductList';
import { Banner } from './components/Banner/Banner';
import { CartProvider } from './context/CartContext';

import { HomePage } from './components/HomePage/HomePage';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from './components/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { FavoritesPage } from './components/FavoritesPage/FavoritesPage';
import { CartPage } from './components/CartPage/CartPage';

export function App() {
  return (
    <CartProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/tablets" element={<TabletsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}
