import { Layout } from '../pages/Layout';

import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import {
  LazyHomePage,
  LazyNotFoundPage,
  LazyProductDetailsPage,
  LazyProductPage,
  LazyShoppingCartPage,
  LazyFavoritesPage,
} from './lazyLoading';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LazyHomePage />} />

        <Route path="phones">
          <Route index element={<LazyProductPage category="phones" />} />

          <Route path=":productId" element={<LazyProductDetailsPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<LazyProductPage category="tablets" />} />

          <Route path=":productId" element={<LazyProductDetailsPage />} />
        </Route>

        <Route path="accessories">
          <Route index element={<LazyProductPage category="accessories" />} />

          <Route path=":productId" element={<LazyProductDetailsPage />} />
        </Route>

        <Route path="favorites" element={<LazyFavoritesPage />} />

        <Route path="cart" element={<LazyShoppingCartPage />} />

        <Route path="*" element={<LazyNotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
