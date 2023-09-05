import {
  Routes,
  Route,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { PageNotFound } from './pages/PageNotFound';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones">
          <Route index element={<CategoryPage />} />
          <Route path=":itemId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<CategoryPage />} />
          <Route path=":itemId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="accessories">
          <Route index element={<CategoryPage />} />
          <Route path=":itemId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="favourites" element={<FavouritesPage />} />

        <Route path="cart" element={<CartPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
