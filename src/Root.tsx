import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { TabletsPage } from './pages/TabletsPage';
import { CartItem } from './pages/CartItem';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Favorites } from './pages/Favorites';
import { AppProvider } from './ContextStor';
import { NotFoundPage } from './pages/NotFoundPageю';
import { QuantityProvider } from './QuantityContext';

export const Root = () => {
  return (
    <Router>
      <AppProvider>
        <QuantityProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />

              <Route path="phones">
                <Route index element={<PhonesPage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="tablets">
                <Route index element={<TabletsPage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="accessories">
                <Route index element={<AccessoriesPage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>

              <Route path="cart" element={<CartItem />} />
              <Route path="favourites" element={<Favorites />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </QuantityProvider>
      </AppProvider>
    </Router>
  );
};
