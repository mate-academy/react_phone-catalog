import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import {
  HomePage,
  ProductsPage,
  ProductDetailsPage,
  FavouritesPage,
  CartPage,
  NotFoundPage,
} from './pages';
import { Layout } from './components';
import { AppRoute } from './enums';
import './App.scss';
import { Preview } from './_preview/Preview';

export const App = () => (
  <Router>
    <h1 className="visually-hidden">Product Catalog</h1>
    <Routes>
      <Route path={AppRoute.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={AppRoute.CATEGORY} element={<ProductsPage />} />
        <Route
          path={AppRoute.PRODUCT_DETAILS}
          element={<ProductDetailsPage />}
        />
        <Route path={AppRoute.CART} element={<CartPage />} />
        <Route path={AppRoute.FAVOURITES} element={<FavouritesPage />} />
        <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage />} />
        <Route path="/preview" element={<Preview />} />
      </Route>
    </Routes>
  </Router>
);
