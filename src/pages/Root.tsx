import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  NotFoundPage,
  CategoryProductsPage,
  FavoriteProductsPage,
  ProductDetailPage,
  CartPage,
} from '.';
import { AppRoutes } from '../libs/enums';
import { App } from './app/App';
import { StateProvider } from '../libs/components/state-provider/StateProvider';
import { ScrollToTop } from '../libs/components';

const categoriesRoutes = [
  AppRoutes.PHONES,
  AppRoutes.TABLETS,
  AppRoutes.ACCESSORIES,
];

export const Root = () => (
  <StateProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoutes.ROOT} element={<App />}>
          <Route index element={<HomePage />} />

          {categoriesRoutes.map((rout) => (
            <Route key={rout} path={rout}>
              <Route index element={<CategoryProductsPage />} />
              <Route
                path={AppRoutes.PRODUCT_DETAIL}
                element={<ProductDetailPage />}
              />
            </Route>
          ))}

          <Route
            path={AppRoutes.FAVORITES}
            element={<FavoriteProductsPage />}
          />

          <Route
            path={AppRoutes.CART}
            element={<CartPage />}
          />

          <Route path={AppRoutes.ANY} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </StateProvider>
);
