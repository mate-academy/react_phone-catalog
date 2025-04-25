import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import './assets/scss/variables.scss';

import { StateProvider } from './state/provider';
import { Layout } from './utils/Layout/Layout';
import { AppRoutes } from './enums/AppRoutes';
import { Categories } from './enums/Categories';

import { HomePage } from './modules/HomePage/HomePage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { ProductPage } from './modules/ProductPage/ProductPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
// eslint-disable-next-line max-len
import { ProductDetailPage } from './modules/ProductDetailPage/ProductDetailPage';

export const App = () => {
  return (
    <StateProvider>
      <Router>
        <Routes>
          <Route path={AppRoutes.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path={AppRoutes.PHONES}
              element={<ProductPage category={Categories.PHONES} />}
            />
            <Route
              path={AppRoutes.TABLETS}
              element={<ProductPage category={Categories.TABLETS} />}
            />
            <Route
              path={AppRoutes.ACCESSORIES}
              element={<ProductPage category={Categories.ACCESSORIES} />}
            />
            <Route
              path={AppRoutes.PRODUCT_DETAILS(':category', ':productId')}
              element={<ProductDetailPage />}
            />
            <Route path={AppRoutes.FAVORITES} element={<FavoritesPage />} />
            <Route path={AppRoutes.CART} element={<CartPage />} />
            <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </StateProvider>
  );
};
