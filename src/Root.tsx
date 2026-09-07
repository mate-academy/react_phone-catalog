import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ShoppingCardPage } from './modules/ShoppingCardPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductsPage } from './modules/ProductsPage';
import { PagesRoute } from './PagesRoute';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path=":productsPage" element={<PagesRoute />}>
            <Route index element={<ProductsPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<ShoppingCardPage />} />

          <Route path="not-found" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
