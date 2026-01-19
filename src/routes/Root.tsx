import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { App } from '../App';
import { NotFoundPage } from '../pages/NotFoundPage';
import { HomePage } from '../pages/HomePage';
import { CategoriesPage } from '../pages/CategoriesPage';
import { GoodPage } from '../pages/GoodPage';
import { RoutePath } from '../types/RoutePath';
import { ProductCategory } from '../types/ProductCategory';
import { FavoritesPage } from '../pages/FavoritesPage';
import { CartPage } from '../pages/CartPage/CartPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={RoutePath.Home} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path={RoutePath.Phones}>
            <Route
              index
              element={
                <CategoriesPage
                  key={ProductCategory.phones}
                  category={ProductCategory.phones}
                />
              }
            />
            <Route path={RoutePath.Phone} element={<GoodPage />} />
          </Route>

          <Route path={RoutePath.Tablets}>
            <Route
              index
              element={
                <CategoriesPage
                  key={ProductCategory.tablets}
                  category={ProductCategory.tablets}
                />
              }
            />
            <Route path=":id" element={<GoodPage />} />
          </Route>

          <Route path={RoutePath.Accessories}>
            <Route
              index
              element={
                <CategoriesPage
                  key={ProductCategory.accessories}
                  category={ProductCategory.accessories}
                />
              }
            />
            <Route path=":id" element={<GoodPage />} />
          </Route>

          <Route path={RoutePath.Favorites}>
            <Route index element={<FavoritesPage />} />
          </Route>

          <Route path={RoutePath.Cart}>
            <Route index element={<CartPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
