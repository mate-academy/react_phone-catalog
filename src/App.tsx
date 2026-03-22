import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ContactsPage } from './modules/ContactsPage';
import { RightsPage } from './modules/RightsPage';
import './App.scss';

export const App: React.FC = () => (
  <HashRouter>
    <CartProvider>
      <FavoritesProvider>
        <div className="layout">
          <Header />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<PhonesPage />} />
              <Route
                path="/phones/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route
                path="/tablets/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route
                path="/accessories/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/rights" element={<RightsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  </HashRouter>
);
