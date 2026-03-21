import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Layout } from '../modules/Layout';
import {
  LazyHomePage,
  LazyNotFoundPage,
  LazyProductDetailsPage,
  LazyProductPage,
  LazyShoppingCartPage,
  LazyFavoritesPage,
} from './lazyLoading';

const PRODUCT_CATEGORIES = ['phones', 'tablets', 'accessories'];

const createProductCategoryRoutes = () => {
  return PRODUCT_CATEGORIES.map(category => (
    <Route key={category} path={category}>
      <Route index element={<LazyProductPage category={category} />} />
      <Route path=":productId" element={<LazyProductDetailsPage />} />
    </Route>
  ));
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LazyHomePage />} />

        {createProductCategoryRoutes()}

        <Route path="favorites" element={<LazyFavoritesPage />} />
        <Route path="cart" element={<LazyShoppingCartPage />} />
        <Route path="*" element={<LazyNotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
