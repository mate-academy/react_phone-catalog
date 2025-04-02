import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ROUTES } from './constants/routes';
import { ProductPage } from './modules/ProductPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ShoppingCartPage } from './modules/ShoppingCartPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductsProvider } from './context/ProductsContext';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const Root = () => (
  <ProductsProvider>
    <HashRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to={ROUTES.HOME} />} />
          <Route path={`:category`}>
            <Route index element={<ProductPage />} />
            <Route path=":itemId?" element={<ProductDetailsPage />} />
          </Route>
          <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
          <Route path={ROUTES.CART} element={<ShoppingCartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </ProductsProvider>
);
