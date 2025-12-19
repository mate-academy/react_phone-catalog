import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { App } from './App';
import { CatalogPage } from './modules/CatalogPage';
import { ProductPage } from './modules/ProductPage';
import { CartPage } from './modules/CartPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ROUTES } from './constants/routes';

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.PHONES} element={<CatalogPage />} />
          <Route path={ROUTES.TABLETS} element={<CatalogPage />} />
          <Route path={ROUTES.ACCESSORIES} element={<CatalogPage />} />
          <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductPage />} />
          <Route path={ROUTES.CART} element={<CartPage />} />
          <Route path={ROUTES.FAVORITES} element={<FavouritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
