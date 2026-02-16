import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import {
  HomePage,
  ProductDetailsPage,
  FavouritesPage,
  CartPage,
  NotFoundPage,
  ProductsPage,
} from './pages';
import { Layout } from './components';
import { AppRoute, Categories } from './enums';
import './App.scss';

export const App = () => (
  <Router>
    <h1 className="visually-hidden">Product Catalog</h1>
    <Routes>
      <Route path={AppRoute.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path={AppRoute.PHONES}
          element={<ProductsPage category={Categories.PHONES} />}
        />
        <Route
          path={AppRoute.TABLETS}
          element={<ProductsPage category={Categories.TABLETS} />}
        />
        <Route
          path={AppRoute.ACCESSORIES}
          element={<ProductsPage category={Categories.ACCESSORIES} />}
        />
        <Route
          path={AppRoute.PRODUCT_DETAILS(':category', ':productId')}
          element={<ProductDetailsPage />}
        />
        <Route path={AppRoute.FAVOURITES} element={<FavouritesPage />} />
        <Route path={AppRoute.CART} element={<CartPage />} />
        <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
