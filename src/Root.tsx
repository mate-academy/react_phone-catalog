import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ROUTES } from './constants/routes';
import { ProductPage } from './modules/ProductsPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ShoppingCartPage } from './modules/ShoppingCartPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { AppProviders } from './AppProviders';

export const Root = () => (
  <HashRouter>
    <AppProviders>
      <Routes>
        <Route path={ROUTES.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to={ROUTES.HOME} />} />
          <Route path=":category" element={<ProductPage />} />
          <Route path=":category/:itemId?" element={<ProductDetailsPage />} />
          <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
          <Route path={ROUTES.CART} element={<ShoppingCartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppProviders>
  </HashRouter>
);
