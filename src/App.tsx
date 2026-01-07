import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import './App.scss';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { Footer } from './components/Footer/Footer';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App = () => (
  <HashRouter>
    <div className="app-wrapper">
      <Header />

      <main className="section">
        {/* 👇 USUNIĘTO <div className="container"> STĄD */}
        {/* Dzięki temu HomePage może mieć slider na całą szerokość ekranu */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/phones/:productId" element={<ProductDetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  </HashRouter>
);
