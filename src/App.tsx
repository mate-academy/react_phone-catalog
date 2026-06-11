/* eslint-disable max-len */
import { Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavouritesContext';

import './App.scss';

import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { CartPage } from './modules/CartPage/CartPage';

export const App = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <div className="App">
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones" element={<PhonesPage />} />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/:category/:itemId"
                element={<ProductDetailsPage />}
              />
              <Route path="/not-found" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </FavoritesProvider>
  );
};
