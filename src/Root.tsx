/* eslint-disable max-len */
import { HashRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { ShoppingCartPage } from './modules/ShoppingCartPage/ShoppingCartPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const Root = () => (
  <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="/phones">
            <Route index element={<CatalogPage type="phones" />} />
            <Route path={':productId'} element={<ProductDetailsPage />} />
          </Route>
          <Route path="/tablets">
            <Route index element={<CatalogPage type="tablets" />} />
            <Route path={':productId'} element={<ProductDetailsPage />} />
          </Route>
          <Route path="/accessories">
            <Route index element={<CatalogPage type="accessories" />} />
            <Route path={':productId'} element={<ProductDetailsPage />} />
          </Route>

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </AppProvider>
);
