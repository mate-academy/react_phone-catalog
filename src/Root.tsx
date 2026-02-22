import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { NotFoundPage } from './components/NotFoundPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { ProductPage } from './modules/ProductPage';
import ScrollToTop from './components/ScrollOnLoad/ScrollOnLoad';

export const Root = () => (
  <Router basename={import.meta.env.BASE_URL}>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to={'/'} replace />} />
        <Route path="phones" element={<CatalogPage />} />
        <Route path="tablets" element={<CatalogPage />} />
        <Route path="accessories" element={<CatalogPage />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="product/:itemId" element={<ProductPage />} />

        <Route path="*" element={<NotFoundPage />} />
        <Route path="not-found" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
