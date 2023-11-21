import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import React from 'react';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonePage/PhonePage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import App from './App';
import { FavouritesProvider } from './context/FavContext';
import { CartProvider } from './context/CartContext';
import { ProductDetailsPage } from './pages/ProducktDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route
        path="/home"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="/"
        element={(
          <CartProvider>
            <FavouritesProvider>
              <App />
            </FavouritesProvider>
          </CartProvider>
        )}
      >
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<TabletsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<AccessoriesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="favourites">
          <Route index element={<FavouritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="cart">
          <Route index element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
