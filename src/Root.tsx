/* eslint-disable max-len */
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';

const productPathes = ['phones', 'tablets', 'accessories'];

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          {productPathes.map((path) => (
            <Route path={path} key={path}>
              <Route index element={<ProductsPage />} />
              <Route path=":itemId" element={<ProductDetailsPage />} />
            </Route>
          ))}

          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
