import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ROUTES } from './constants/routes';
import { ProductPage } from './modules/ProductPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ShoppingCartPage } from './modules/ShoppingCartPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CategoriesProvider } from './context/СategoriesContext';

export const Root = () => (
  <CategoriesProvider>
    <HashRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to={ROUTES.HOME} />} />
          <Route path={ROUTES.PHONES} element={<ProductPage />}></Route>
          <Route path={ROUTES.TABLETS} element={<ProductPage />}></Route>
          <Route path={ROUTES.ACCESSORIES} element={<ProductPage />}></Route>
          <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
          <Route path={ROUTES.CART} element={<ShoppingCartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </CategoriesProvider>
);
