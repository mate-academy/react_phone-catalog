import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import React from 'react';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavouritesPage } from './pages/FavoritePage';
import { CartsPage } from './pages/CartsPage';
import { ThemeProvider } from './hooks/useTheme';
import { ProductsProvider } from './hooks/savedProducts';

export const Root = () => {
  return (
    <ThemeProvider>
      <ProductsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="phones" element={<PhonesPage />} />
              <Route path="tablets" element={<TabletsPage />} />
              <Route path="accessories" element={<AccessoriesPage />} />
              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="cart" element={<CartsPage />} />
            </Route>
          </Routes>
        </Router>
      </ProductsProvider>
    </ThemeProvider>
  );
};
