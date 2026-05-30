import { Route, Routes } from 'react-router-dom';

import { App } from './App';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { MainNavigation } from './utils/constants';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductPage } from './modules/ProductPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path={MainNavigation.PHONES} element={<PhonesPage />} />
        <Route
          path={`${MainNavigation.PHONES}/:id`}
          element={<ProductPage />}
        />

        <Route path={MainNavigation.TABLETS} element={<TabletsPage />} />
        <Route
          path={`${MainNavigation.TABLETS}/:id`}
          element={<ProductPage />}
        />

        <Route
          path={MainNavigation.ACCESSORIES}
          element={<AccessoriesPage />}
        />
        <Route
          path={`${MainNavigation.ACCESSORIES}/:id`}
          element={<ProductPage />}
        />

        <Route path={MainNavigation.FAVOURITES} element={<FavouritesPage />} />
        <Route path={MainNavigation.CART} element={<CartPage />} />
        <Route path={MainNavigation.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
