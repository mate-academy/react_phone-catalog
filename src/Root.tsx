import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { AppProvider } from './context/AppContext';
import { PhonePage } from './pages/PhonePage';
import { Breadcrumbs } from './components/BreadCrumbs/BreadCrumbs';
import { CartPage } from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';
import { FavouritesPage } from './pages/FavouritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';

export const Root: React.FC = () => (
  <FavouritesProvider>
    <CartProvider>
      <AppProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="phones">
                <Route index element={<PhonePage />} />
                <Route path=":productId" element={<ProductDetailsPage />} />
              </Route>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="/tablets" element={<TabletsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="*" element={<Breadcrumbs />} />
            </Route>
          </Routes>
        </HashRouter>
      </AppProvider>
    </CartProvider>
  </FavouritesProvider>

);
