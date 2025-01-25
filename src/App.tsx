import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './assets/scss/variables.scss';
import './App.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { Layout } from './utils/Layout';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { StateProvider } from './state/provider';
import { AppRoute } from './enums/AppRoutes';
import { ProductDetailPage } from './pages/ProductDetailPage/ProductDetailPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { Categories } from './enums/Categories';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App = () => {
  return (
    <StateProvider>
      <Router>
        <Routes>
          <Route path={AppRoute.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path={AppRoute.PHONES}
              element={<ProductPage category={Categories.PHONES} />}
            />
            <Route
              path={AppRoute.TABLETS}
              element={<ProductPage category={Categories.TABLETS} />}
            />
            <Route
              path={AppRoute.ACCESSORIES}
              element={<ProductPage category={Categories.ACCESSORIES} />}
            />
            <Route
              path={AppRoute.PRODUCT_DETAILS(':category', ':productId')}
              element={<ProductDetailPage />}
            />
            <Route path={AppRoute.FAVOURITES} element={<FavouritesPage />} />
            <Route path={AppRoute.CART} element={<CartPage />} />
            <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </StateProvider>
  );
};
