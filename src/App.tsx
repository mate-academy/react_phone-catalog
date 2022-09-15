import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { ContextProvider } from './components/Context/Context';

import './styles/main.scss';

export const App: React.FC = () => {
  return (
    <ContextProvider>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/phones/:productId" element={<ProductDetailsPage />} />
            <Route path="/tablets" element={<TabletsPage />} />
            <Route path="/tablets/:productId" element={<ProductDetailsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ContextProvider>
  );
};
